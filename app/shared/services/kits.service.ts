import { Injectable } from "@angular/core";

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

export interface ClubKit {
    clubName: string;
    home: Kit;
    away: Kit;
    third?: Kit;
}

@Injectable({
    providedIn: 'root'
})
export class KitsService {
    // back.jpg always needs to be first
    private clubKits: ClubKit[] = [
        {
            clubName: 'Chelsea',
            home: {
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc-264397/back.jpg',
                    '~/images/cfc-264397/angle.jpg',
                    '~/images/cfc-264397/front.jpg']
            },
            away: {
                name: 'Vapor Match',
                year: '\'19-\'20',
                font: {
                    color: '#013871',
                },
                imgSrcs: ['~/images/cfc-264394/back.jpg',
                    '~/images/cfc-264394/angle.jpg',
                    '~/images/cfc-264394/front.jpg']
            },
            third: {
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc/264497/back.jpg',
                    '~/images/cfc/264497/angle.jpg',
                    '~/images/cfc/264497/front.jpg']
            },
        },
    ];

    getClubKits(): ClubKit[] {
        return this.clubKits;
    }
}