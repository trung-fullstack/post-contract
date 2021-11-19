export class Utils {
  public convertString(str: string): string {
    return str.replace(/[a-z]/gi, x => {
      return String.fromCharCode(x.charCodeAt(0) + (x.toLowerCase() <= 'm' ? 13 : -13));
    });
  }
}

const defaultUtils = new Utils()
export default defaultUtils
