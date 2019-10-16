import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface KitFont {
    className?: string;
    color: string;
}

export interface Kit {
    name: string;
    year: string;
    font: KitFont;
    imgSrcs: string[];
}

export enum KitType {
    Home = "home",
    Away = "away",
    Thrid = "third",    // ClubKit thrid is optional
}

export interface Club {
    clubName: string;
    logo: string;
    bkgColor: string;
    home: Kit;
    away: Kit;
    third?: Kit;
}

@Injectable({
    providedIn: 'root'
})
export class KitsService {
    // imgSrcs need to be in order back,angle,front
    private clubs: Club[] = [
        {
            clubName: 'Chelsea FC',
            logo: '~/images/chelsea.png',
            bkgColor: '#4377a6',
            home: {
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc-264397/back.jpg', '~/images/cfc-264397/angle.jpg', '~/images/cfc-264397/front.jpg']
            },
            away: {
                name: 'Vapor Match',
                year: '\'19-\'20',
                font: {
                    color: '#013871',
                },
                imgSrcs: ['~/images/cfc-264394/back.jpg', '~/images/cfc-264394/angle.jpg', '~/images/cfc-264394/front.jpg']
            },
            third: {
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc/264497/back.jpg', '~/images/cfc/264497/angle.jpg', '~/images/cfc/264497/front.jpg']
            },
        },
    ];

    getClubs(): Club[] {
        return this.clubs;
    }

    private currentClubIdx = 0;
    public currentClub$ = new BehaviorSubject<Club>(this.clubs[this.currentClubIdx]);

    private currentClubKitType: KitType = KitType.Home;
    public currentClubKit$ = new BehaviorSubject<Kit>(this.clubs[this.currentClubIdx][this.currentClubKitType]);

    getClub(idx: number): Club {
        return this.clubs[idx];
    }

    getCurrentClub(): Club {
        return this.clubs[this.currentClubIdx];
    }

    setCurrentClub(idx: number) {
        this.currentClubIdx = idx;
        this.currentClub$.next(this.getClub(idx));
    }

    setCurrentClubKit(kitType: KitType) {
        this.currentClubKitType = kitType;
        this.currentClubKit$.next(this.getCurrentClub()[this.currentClubKitType]);
    }
}