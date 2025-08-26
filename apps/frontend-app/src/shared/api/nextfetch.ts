import { API_URL } from '../lib/const/env'
import { combineURLs } from '../lib/utils/url/combineURLs'
import isAbsoluteURL from '../lib/utils/url/isAbsoluteURL'

// Function wrapper for fetching data on server

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nextfetch = async <T = any>(url: string, init?: RequestInit): Promise<T> => {
	const correctUrl = isAbsoluteURL(url) ? url : combineURLs(API_URL, url)

	try {
		const res = await fetch(correctUrl, init)

		if (!res.ok) {
			throw new Error(`Request failed with status ${res.status}`)
		}

		return res.json()
	} catch (error) {
		throw new Error('An error occurred while fetching the data ' + url)
	}
}
