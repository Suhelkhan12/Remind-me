export enum AllCollectionColors {
    sunset = "bg-gradient-to-r from-red-500 to-orange-500",
    ocean = "bg-gradient-to-r from-blue-500 to-green-500",
    twilight = "bg-gradient-to-r from-purple-600 to-pink-500",
    sunrise = "bg-gradient-to-r from-yellow-400 to-red-600",
    forest = "bg-gradient-to-r from-green-500 to-teal-500",
    dusk = "bg-gradient-to-r from-indigo-700 to-purple-500",
    autumn = "bg-gradient-to-r from-orange-400 to-red-600",
    sky = "bg-gradient-to-r from-blue-300 to-indigo-400",
    meadow = "bg-gradient-to-r from-green-400 to-lime-500",
    fire = "bg-gradient-to-r from-yellow-500 to-red-500",
    aurora = "bg-gradient-to-r from-green-300 to-purple-600"
}

export type CollectionColor = keyof typeof AllCollectionColors;