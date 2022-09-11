import * as store from './store.js'

const licenseCache = new Set<string>()

async function loadLicenseCache(): Promise<number> {
  licenseCache.clear()
  for ( const license of await store.listLicenses() ) {
    licenseCache.add(license)
  }
  return licenseCache.keys.length
}

const oneMinute = (60 * 1000)
const oneHour = 60 * oneMinute

setInterval(loadLicenseCache, oneHour)

export default () => {
  console.log('*** cache init ...')
  
  loadLicenseCache().then(count => {
    console.log('*** license cache count: ', count)
  })
}

export function addLicense(license: string): void {
  licenseCache.add(license)
}