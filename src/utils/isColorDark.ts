export const isColorDark = (hexColor:any) => {
    if (!hexColor) return false;
  
    // Remove "#" if present
    const hex = hexColor.replace('#', '');
  
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
  
    // Standard luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness < 128;
  };