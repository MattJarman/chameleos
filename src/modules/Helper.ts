import GenericIndexItem from '../interfaces/GenericIndexItem'

export default class Helper {
  public static search (index: Array<GenericIndexItem>, search: string): GenericIndexItem {
    let minDistance = Number.MAX_SAFE_INTEGER
    search = search.toLowerCase()

    let found = index[0]
    for (const item of index) {
      const name = item.name.toLowerCase()
      const distance = Helper.levenshteinDistance(search, name)

      if (distance < minDistance) {
        minDistance = distance
        found = item
      }
    }

    return found
  }

  public static levenshteinDistance (a: string, b: string): number {
    const matrix = Helper.createEmptyMatrix(a.length + 1, b.length + 1)

    for (let i = 0; i <= a.length; i++) {
      matrix[i][0] = i
    }

    for (let i = 0; i <= b.length; i++) {
      matrix[0][i] = i
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + indicator
        )
      }
    }

    return matrix[a.length][b.length]
  }

  public static createEmptyMatrix (width: number, height: number): number[][] {
    return Array(width).fill(0).map(() => Array(height).fill(0))
  }

  public static capitalise (word: string): string {
    return word
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }
}
