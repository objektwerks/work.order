import { isLicense } from './entity.js'

const licenseCache = new Set<string>()

export default () => {
  console.log('*** cache init ...')
}

export function addLicense(license: string): void {
  if (!licenseCache.has(license) && isLicense(license)) licenseCache.add(license)
}

export function isLicenseValid(license: string): boolean {
  return licenseCache.has(license)
}