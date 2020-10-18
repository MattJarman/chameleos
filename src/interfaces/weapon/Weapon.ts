import Ammo from './Ammo'

export interface MelodyStats {
    duration: number
    extension: number
}

export interface MelodyInfo {
    name: string
    notes: string
    'effect_1': string
    'effect_2': string
    base: MelodyStats
    maestro: {
        'level_1': MelodyStats
        'level_2': MelodyStats
    }
}

export interface CraftingWeapon {
    name: string
    url: string
}

export interface CraftingItem {
    id: number
    name: string
    quantity: number
}

export interface WeaponSkill {
    name: string
    level: number
    'max_level': number
    'is_secret': boolean
}

export interface Element {
    element: string
    attack: number
    hidden: boolean
}

export default interface Weapon {
    name: string
    type: string
    rarity: number
    icon: string
    category: string | null
    attack: number
    'true_attack': number
    affinity: number
    defense: number
    elderseal: number | null
    slots: {
        'slot_1': number
        'slot_2': number
        'slot_3': number
    }
    elements: Array<Element>
    sharpness: {
        maxed: boolean
        values: {
            red: number
            orange: number
            yellow: number
            green: number
            blue: number
            white: number
            purple: number
        }
    }
    skills: Array<WeaponSkill>
    crafting: {
        craftable: boolean
        final: boolean
        'crafting_cost': Array<CraftingItem>
    }
    'previous_weapon': CraftingWeapon | null
    upgrades: Array<CraftingWeapon>
    kinsect: string | null
    phial: {
        type: string
        power: number | null
    } | null
    shelling: {
        type: string
        level: number
    } | null
    coatings: {
        close: boolean
        power: boolean
        paralysis: boolean
        poison: boolean
        sleep: boolean
        blast: boolean
    } | null
    ammo: Ammo | null
    melodies: MelodyInfo | null
}
