export interface CustomerReviews {
    comments: string,
    rating: number
    accountProfileId: string
    accountProfileName: string
}

export interface EditedCustomerReviews {
    reviewID: string,
    comments: string,
    rating: number
    accountProfileId: string
    accountProfileName: string
}
