export type SessionSchema = {
	token: string
	headerBanner?: HeaderBanner
}

export type HeaderBanner = {
	NAME: string
	BANNER_IMAGE_DESC: string
	BANNER_IMAGE_MOBILE: string
	LINK_VALUE: string
	COLOR_VALUE: null
}
