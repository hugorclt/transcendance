import {EMap} from '../../shared/enum'

export function getMapName(mapName: EMap) : string {
    switch(mapName) {
        case EMap.CLASSIC:
            return "Classic"
        case EMap.SPACE:
            return "Space";
    }
}