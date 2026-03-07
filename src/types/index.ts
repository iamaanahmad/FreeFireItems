export interface RawItemData {
    itemID?: string;
    description?: string;
    description2?: string;
    icon?: string;
    itemType?: string;
    collectionType?: string;
    Rare?: string;
}

export interface ProcessedItem {
    itemId: string;
    name: string;
    iconName: string;
    description: string;
    description2: string;
    itemType: string;
    collectionType: string;
    Rare: string;
    imageUrl: string;
}
