import SQLite, { SQLiteDatabase, ResultSet } from "react-native-sqlite-storage";

SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

export const initDB = async (): Promise<SQLiteDatabase> => {
    if (db) return db;
    db = await SQLite.openDatabase({ name: "chatbox.db", location: "default" });
    await db.executeSql(
        `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      _id TEXT UNIQUE,
      roomId TEXT NOT NULL,
      sender TEXT,
      receiver TEXT,
      message TEXT,
      timestamp INTEGER,
      isRead INTEGER DEFAULT 0
    );`
    );

    await db.executeSql(`
  CREATE TABLE IF NOT EXISTS conversations (
    roomId TEXT PRIMARY KEY,
    lastMessage TEXT,
    timestamp INTEGER,
    unreadCount INTEGER,
    userId TEXT,
    userName TEXT,
    userEmail TEXT,
    userImage TEXT
  );
`);
    return db;
};

export const getDB = async (): Promise<SQLiteDatabase> => {
    if (!db) {
        db = await initDB();
    }
    return db;
};


export interface Message {
    roomId: string;
    _id: string;
    sender: string;
    receiver: string;
    message: string;
    timestamp?: string | number; // ISO from backend or epoch
    isRead?: boolean;
}

export const insertMessage = async (msg: Message | Message[]) => {
    const database = await getDB();
    const messages = Array.isArray(msg) ? msg : [msg];
    await database.transaction(async (tx) => {
        for (const m of messages) {
            const timestamp =
                typeof m.timestamp === "string"
                    ? new Date(m.timestamp).getTime()
                    : m.timestamp || Date.now();
            await tx.executeSql(
                `INSERT OR REPLACE INTO messages (_id, roomId, sender, receiver, message, timestamp, isRead)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    m._id,
                    m.roomId,
                    m.sender,
                    m.receiver,
                    m.message,
                    timestamp,
                    m.isRead ? 1 : 0,
                ]
            );
            await tx.executeSql(
                `DELETE FROM messages 
                 WHERE id NOT IN (
                   SELECT id FROM messages 
                   WHERE roomId = ? 
                   ORDER BY timestamp DESC 
                   LIMIT 20
                 ) AND roomId = ?`,
                [m.roomId, m.roomId]
            );
        }
    });
    console.log(`✅ Inserted ${messages.length} message(s)`);
};

export const getMessagesByRoom = async (
    roomId: string,
    limit: number = 20
): Promise<Message[]> => {
    const database = await getDB();
    const [results] = await database.executeSql(
        `SELECT * FROM messages 
     WHERE roomId = ? 
     ORDER BY timestamp ASC 
     LIMIT ?`,
        [roomId, limit]
    );

    return results.rows.raw().map((row) => ({
        ...row,
        timestamp: row.timestamp ? new Date(row.timestamp).toISOString() : null,
        isRead: !!row.isRead,
    }));
};

export const updateMessage = async (
    messageId: string,
    fields: Partial<{
        message: string;
        isRead: boolean;
        timestamp: number | string;
        sender: string;
        receiver: string;
    }>
) => {
    const database: SQLiteDatabase = await getDB();

    // Build SET clause dynamically
    const keys = Object.keys(fields);
    if (keys.length === 0) return; // nothing to update

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const values = keys.map((key) =>
        key === "isRead" ? (fields[key as keyof typeof fields] ? 1 : 0) : fields[key as keyof typeof fields]
    );

    await database.executeSql(
        `UPDATE messages SET ${setClause} WHERE _id = ?`,
        [...values, messageId]
    );

    console.log(`✅ Updated message ${messageId} with fields:`, fields);
};

export const addConversationToDb = async (apiData: any) => {
    console.log(apiData, "data==>")
    const database = await getDB();
    const timestamp = new Date(apiData.timestamp).getTime();
    await database.executeSql(
        `INSERT OR REPLACE INTO conversations 
      (roomId, lastMessage, timestamp, unreadCount, userId, userName, userEmail, userImage)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            apiData.roomId,
            apiData.lastMessage,
            timestamp,
            apiData.unreadCount,
            apiData.user._id,
            apiData.user.name,
            apiData.user.email,
            apiData.user.image,
        ]
    );
    console.log(`✅ Inserted ${apiData._id} conversations(s)`);
};

export const getConversations = async (): Promise<any[]> => {
    const database = await getDB();
    const [results] = await database.executeSql(
        `SELECT * FROM conversations ORDER BY timestamp DESC`
    );

    return results.rows.raw().map((row) => ({
        lastMessage: row.lastMessage,
        roomId: row.roomId,
        timestamp: new Date(row.timestamp).toISOString(),
        unreadCount: row.unreadCount,
        user: {
            _id: row.userId,
            name: row.userName,
            email: row.userEmail,
            image: row.userImage,
        },
        _id: row.roomId, // match API shape
    }));
};

export const updateConversationOnNewMessage = async (newMessage: any) => {
    const database = await getDB();

    const timestamp =
        typeof newMessage.timestamp === "string"
            ? new Date(newMessage.timestamp).getTime()
            : newMessage.timestamp || Date.now();

    await database.executeSql(
        `UPDATE conversations 
     SET lastMessage = ?, 
         timestamp = ?, 
         unreadCount = ? 
     WHERE roomId = ?`,
        [newMessage.lastMessage, timestamp, newMessage.unreadCount, newMessage.roomId]
    );

    console.log(`✅ Conversation ${newMessage.roomId} updated with new message`);
};

export const clearTables = async () => {
  try {
    const database = await getDB();
    await database.executeSql(`DELETE FROM messages;`);
    await database.executeSql(`DELETE FROM conversations;`);
    console.log("✅ All tables cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing tables:", error);
  }
};

export const dropDB = async () => {
    try {
        await SQLite.deleteDatabase({ name: "chatbox.db", location: "default" });
        console.log("✅ Database deleted successfully");
    } catch (error) {
        console.error("❌ Error deleting database:", error);
    }
};