import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface KitFont {
    className?: string;
    color: string;
}

export enum KitType {
    Home = "home",
    Away = "away",
    Thrid = "third",    // ClubKit thrid is optional
}

export interface Kit {
    name: string;
    year: string;
    font: KitFont;
    imgSrcs: string[];
    kitType: KitType;
    background: string;
    brand: string;
}

export interface Club {
    name: string;
    logo: string;
    background: string;
    kits: Kit[];
}

@Injectable({
    providedIn: 'root'
})
export class KitsService {
    // imgSrcs need to be in order back,angle,front
    private clubs: Club[] = [
        {
            name: 'Real Madrid',
            logo: '~/images/rm.png',
            background: '#00529F',
            kits: [{
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Home,
                name: 'Home',
                year: '\'19-\'20',
                font: {
                    color: '#8C734B',
                },
                imgSrcs: ['~/images/rm-home/back.jpg', '~/images/rm-home/angle.jpg', '~/images/rm-home/front.png'],
                brand: 'Adidas',
            },
            {
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Away,
                name: 'Away',
                year: '\'19-\'20',
                font: {
                    color: '#8C734B',
                },
                imgSrcs: ['~/images/rm-away/back.jpg', '~/images/rm-away/angle.jpg', '~/images/rm-away/front.jpg'],
                brand: 'Adidas',
            },
            {
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Thrid,
                name: 'Third',
                year: '\'19-\'20',
                font: {
                    color: '#21323A',
                },
                imgSrcs: ['~/images/rm-third/back.jpg', '~/images/rm-third/angle.jpg', '~/images/rm-third/front.jpg'],
                brand: 'Adidas',
            }],
        },
        {
            name: 'Chelsea',
            logo: '~/images/chelsea.png',
            background: '#4377a6',
            kits: [{
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Home,
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc-264397/back.jpg', '~/images/cfc-264397/angle.jpg', '~/images/cfc-264397/front.jpg'],
                brand: 'Nike',
            },
            {
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Away,
                name: 'Vapor Match',
                year: '\'19-\'20',
                font: {
                    color: '#013871',
                },
                imgSrcs: ['~/images/cfc-264394/back.jpg', '~/images/cfc-264394/angle.jpg', '~/images/cfc-264394/front.jpg'],
                brand: 'Nike',
            },
            {
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Thrid,
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc-264497/back.jpg', '~/images/cfc-264497/angle.jpg', '~/images/cfc-264497/front.jpg'],
                brand: 'Nike',
            }],
        },
        {
            name: 'Manchester United',
            logo: '~/images/manchester.png',
            background: '#4377a6',
            kits: [{
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Home,
                name: 'Home',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/mufc-251562/back.jpg', '~/images/mufc-251562/angle.jpg', '~/images/mufc-251562/front.jpg'],
                brand: 'Adidas',
            },
            {
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Away,
                name: 'Cup',
                year: '\'19-\'20',
                font: {
                    color: '#000000',
                },
                imgSrcs: ['~/images/mufc-251563/back.jpg', '~/images/mufc-251563/angle.jpg', '~/images/mufc-251563/front.jpg'],
                brand: 'Adidas',
            },
            {
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                kitType: KitType.Thrid,
                name: 'Third',
                year: '\'19-\'20',
                font: {
                    color: '#E7472F',
                },
                imgSrcs: ['~/images/mufc-251565/back.jpg', '~/images/mufc-251565/angle.jpg', '~/images/mufc-251565/front.jpg'],
                brand: 'Adidas',
            }],
        },
    ];

    getClubs(): Club[] {
        return this.clubs;
    }

    private currentClubIdx = 0;
    public currentClub$ = new BehaviorSubject<Club>(this.clubs[this.currentClubIdx]);

    private currentClubKitIdx: number = 0;
    public currentClubKit$ = new BehaviorSubject<Kit>(this.clubs[this.currentClubIdx].kits[this.currentClubKitIdx]);

    getClub(idx: number): Club {
        return this.clubs[idx];
    }

    getCurrentClub(): Club {
        return this.clubs[this.currentClubIdx];
    }

    getCurrentClubIdx(): number {
        return this.currentClubIdx;
    }

    setCurrentClub(idx: number) {
        this.currentClubIdx = idx;
        this.currentClub$.next(this.getClub(idx));
        this.setCurrentClubKit(0);
    }

    setCurrentClubKit(idx: number) {
        const kit = this.getCurrentClub().kits[idx];
        this.currentClubKitIdx = idx;
        this.currentClubKit$.next(kit);
    }

    getCurrentClubKitIdx(): number {
        return this.currentClubIdx;
    }
}