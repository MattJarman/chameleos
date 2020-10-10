import Helper from '../../src/modules/Helper'
import GenericIndexItem from '../../src/interfaces/GenericIndexItem'

const helper = new Helper()

const index: Array<GenericIndexItem> = [
  {
    id: 1,
    name: 'John',
    url: 'https://example.com/john'
  },
  {
    id: 2,
    name: 'Sarah',
    url: 'https://example.com/sarah'
  },
  {
    id: 3,
    name: 'Nathan',
    url: 'https://example.com/nathan'
  }
]

describe('Test createEmptyMatrix', () => {
  it('returns a matrix of 0s with a specified width and height', () => {
    const width = 2
    const height = 3

    const expected = [
      [0, 0, 0],
      [0, 0, 0]
    ]
    const actual = helper.createEmptyMatrix(width, height)

    expect(actual).toEqual(expected)
  })
})

describe('Test levenshteinDistance', () => {
  it('returns 0 if no characters are different', () => {
    const stringA = 'hello'
    const stringB = 'hello'
    const expected = 0

    const actual = helper.levenshteinDistance(stringA, stringB)

    expect(actual).toEqual(expected)
  })

  it('returns 1 if the one character is different', () => {
    const stringA = 'hellp'
    const stringB = 'hello'
    const expected = 1

    const actual = helper.levenshteinDistance(stringA, stringB)

    expect(actual).toEqual(expected)
  })

  it('returns 5 if all characters are different', () => {
    const stringA = 'abcdf'
    const stringB = 'hello'
    const expected = 5

    const actual = helper.levenshteinDistance(stringA, stringB)

    expect(actual).toEqual(expected)
  })
})

describe('Test search', () => {
  it('returns sarah when searching for sarah', () => {
    const search = 'Sarah'

    const expected = {
      id: 2,
      name: 'Sarah',
      url: 'https://example.com/sarah'
    }

    const actual = helper.search(index, search)
    expect(actual).toEqual(expected)
  })

  it('returns john when closest match is john', () => {
    const search = 'johb'

    const expected = {
      id: 1,
      name: 'John',
      url: 'https://example.com/john'
    }

    const actual = helper.search(index, search)
    expect(actual).toEqual(expected)
  })

  it('returns nathan when closest match is nathan', () => {
    const search = 'Naffan'

    const expected = {
      id: 3,
      name: 'Nathan',
      url: 'https://example.com/nathan'
    }

    const actual = helper.search(index, search)
    expect(actual).toEqual(expected)
  })
})
