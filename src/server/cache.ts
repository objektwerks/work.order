import * as store from './store.js'
import { oneHour } from './time.js'
import { isLicense } from './entity.js'

const licenseCache = new Set<string>()

async function loadLicenseCache(): Promise<number> {
  licenseCache.clear()
  for ( const license of await store.listLicenses() ) {
    licenseCache.add(license)
  }
  return licenseCache.size
}

setInterval(loadLicenseCache, oneHour)

export default () => {
  console.log('*** cache init ...')

  loadLicenseCache().then(count => {
    console.log('*** license cache count: ', count)
  })
}

export function addLicense(license: string): void {
  if (!licenseCache.has(license) && isLicense(license)) licenseCache.add(license)
}

export function isLicenseValid(license: string): boolean {
  return licenseCache.has(license)
}