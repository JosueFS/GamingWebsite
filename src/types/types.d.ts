export type Game = {
    id: number;
    slug: string;
    name: string;
    released: string;
    description: string;
    metacritic: number;
    background_image_additional: string;
    background_image: string;
    short_screenshots: Screenshot[];
    website: string;
}

export type Genre = {

}

export type Achievement = {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: string;
}

export type AchievementsList = {
    count: number;
    results: Achievement[];
}

export type Screenshot = {
    id?: number;
    image: string;
}