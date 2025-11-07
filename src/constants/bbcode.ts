export const ALLOWED_SIZES = [50, 85, 100, 150] as const
export const SIZE_REGEX = new RegExp(`\\[size=(${ALLOWED_SIZES.join("|")})\\](.*?)\\[\\/size\\]`, "gis")

export const ALLOWED_COLORS = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "gray", "cyan", "magenta"] as const
