export const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s);
export const isPhone = (s: string) => /^[0-9]{10,}$/.test(s);
export const isCardToken = (s: string) => s.length > 6; 
