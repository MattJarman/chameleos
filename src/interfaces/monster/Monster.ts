export interface Traps {
    pitfall: boolean
    shock: boolean
    vine: boolean
}

export interface Ailments {
    roar: boolean
    wind: boolean
    tremor: boolean
    'defense_down': boolean
    'fire_blight': boolean
    'water_blight': boolean
    'thunder_blight': boolean
    'ice_blight': boolean
    'dragon_blight': boolean
    'blast_blight': boolean
    regional: boolean
    poison: boolean
    sleep: boolean
    paralysis: boolean
    bleed: boolean
    stun: boolean
    mud: boolean
    effluvia: boolean
}

export interface Weaknesses {
    fire: number
    water: number
    ice: number
    thunder: number
    dragon: number
    poison: number
    sleep: number
    paralysis: number
    blast: number
    stun: number
}

export interface Location {
    location: string
    'start_area': number | null
    'move_area': number | null
    'rest_area': number | null
}

export interface Rewards {
    lr?: Record<string, unknown>
    hr?: Record<string, unknown>
    mr?: Record<string, unknown>
}
export interface Hitzone {
    cut: number
    impact: number
    shot: number
    fire: number
    water: number
    ice: number
    thunder: number
    dragon: number
    ko: number
}

export default interface Monster {
    name: string
    size: string,
    species: string | null,
    icon: string,
    colour: string,
    description: string
    traps: Traps
    ailments: Ailments
    weaknesses: Weaknesses
    locations: Array<Location>
    rewards: Rewards
    breaks: Record<string, unknown>
    hitzones: {
        head: Hitzone
        body: Hitzone
    }
}
