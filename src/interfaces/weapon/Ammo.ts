export default interface Ammo {
    deviation: number
    special: number
    normal: {
        'normal_1': {
            clip: number
            rapid: number
            recoil: number
            reload: number
        },
        'normal_2': {
            clip: number
            rapid: number
            recoil: number
            reload: number
        },
        'normal_3': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    pierce: {
        'pierce_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'pierce_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'pierce_3': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    spread: {
        'spread_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'spread_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'spread_3': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    sticky: {
        'sticky_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'sticky_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'sticky_3': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    cluster: {
        'cluster_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'cluster_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'cluster_3': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    recover: {
        'recover_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'recover_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    poison: {
        'poison_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'poison_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    paralysis: {
        'paralysis_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'paralysis_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    sleep: {
        'sleep_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'sleep_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    exhaust: {
        'exhaust_1': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        },
        'exhaust_2': {
            clip: number
            rapid: number
            recoil: number
            reload: string
        }
    },
    flaming: {
        clip: number
        rapid: number
        recoil: number
        reload: string
    },
    water: {
        clip: number
        rapid: number
        recoil: number
        reload: string
    },
    freeze: {
        clip: number
        rapid: number
        recoil: number
        reload: string
    },
    thunder: {
        clip: number
        rapid: number
        recoil: number
        reload: string
    },
    dragon: {
        clip: number
        rapid: number
        recoil: number
        reload: string
    },
    slicing: {
        clip: number
        rapid: number
        recoil: number
        reload: string
    },
    wyvern: {
        clip: number
        reload: string
    },
    demon: {
        clip: number
        recoil: number
        reload: string
    },
    armor: {
        clip: number
        recoil: number
        reload: string
    },
    tranq: {
        clip: number
        recoil: number
        reload: string
    }
}
