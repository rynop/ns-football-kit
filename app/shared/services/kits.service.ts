import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface KitFont {
    nameFontClass?: string;
    numberFontClass?: string;
    color: string;
}

export interface Kit {
    name: string;
    year: string;
    font: KitFont;
    imgSrcs: string[];
    background: string;
    brand: string;
    color: string; // main jersey color
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
                color: 'white',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Home',
                year: '\'19-\'20',
                font: {
                    color: '#8C734B',
                    nameFontClass: 'rm-name-font', numberFontClass: 'rm-number-font',
                },
                imgSrcs: ['~/images/rm-home/back.jpg', '~/images/rm-home/angle.jpg', '~/images/rm-home/front.png'],
                brand: 'Adidas',
            },
            {
                color: '#171E30',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Away',
                year: '\'19-\'20',
                font: {
                    color: '#F8F1C3',
                    nameFontClass: 'rm-name-font', numberFontClass: 'rm-number-font',
                },
                imgSrcs: ['~/images/rm-away/back.jpg', '~/images/rm-away/angle.jpg', '~/images/rm-away/front.jpg'],
                brand: 'Adidas',
            },
            {
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Third',
                year: '\'19-\'20',
                font: {
                    color: '#21323A',
                    nameFontClass: 'rm-name-font', numberFontClass: 'rm-number-font',
                },
                imgSrcs: ['~/images/rm-third/back.jpg', '~/images/rm-third/angle.jpg', '~/images/rm-third/front.jpg'],
                brand: 'Adidas',
            }, {
                color: '#D68B13',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Home GK',
                year: '\'19-\'20',
                font: {
                    color: '#372E29',
                    nameFontClass: 'rm-name-font', numberFontClass: 'rm-number-font',
                },
                imgSrcs: ['~/images/rm-home-gk/back.jpg', '~/images/rm-home-gk/angle.jpg', '~/images/rm-home-gk/front.jpg'],
                brand: 'Adidas',
            }, {
                color: '#324A4E',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Away GK',
                year: '\'19-\'20',
                font: {
                    color: '#FBF2AF',
                    nameFontClass: 'rm-name-font', numberFontClass: 'rm-number-font',
                },
                imgSrcs: ['~/images/rm-away-gk/back.jpg', '~/images/rm-away-gk/angle.jpg', '~/images/rm-away-gk/front.jpg'],
                brand: 'Adidas',
            },],
        },
        {
            name: 'Chelsea',
            logo: '~/images/chelsea.png',
            background: '#4377a6',
            kits: [{
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Stadium',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/cfc-264397/back.jpg', '~/images/cfc-264397/angle.jpg', '~/images/cfc-264397/front.jpg'],
                brand: 'Nike',
            },
            {
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Vapor Match',
                year: '\'19-\'20',
                font: {
                    color: '#013871',
                },
                imgSrcs: ['~/images/cfc-264394/back.jpg', '~/images/cfc-264394/angle.jpg', '~/images/cfc-264394/front.jpg'],
                brand: 'Nike',
            },
            {
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
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
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Home',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                },
                imgSrcs: ['~/images/mufc-251562/back.jpg', '~/images/mufc-251562/angle.jpg', '~/images/mufc-251562/front.jpg'],
                brand: 'Adidas',
            },
            {
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Cup',
                year: '\'19-\'20',
                font: {
                    color: '#000000',
                },
                imgSrcs: ['~/images/mufc-251563/back.jpg', '~/images/mufc-251563/angle.jpg', '~/images/mufc-251563/front.jpg'],
                brand: 'Adidas',
            },
            {
                color: '#42C6B1',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
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

    private currentClubIdx = 0;
    public currentClub$ = new BehaviorSubject<Club>(this.clubs[this.currentClubIdx]);

    private currentClubKitIdx: number = 0;
    public currentClubKit$ = new BehaviorSubject<Kit>(this.clubs[this.currentClubIdx].kits[this.currentClubKitIdx]);

    public sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    public currentSize$ = new BehaviorSubject<string>(this.sizes[1]);
    setCurrentSize(v: string) {
        this.currentSize$.next(v);
    }

    public currentNumber$ = new BehaviorSubject<string>('7');
    setCurrentNumber(v: string) {
        this.currentNumber$.next(v);
    }
    public currentName$ = new BehaviorSubject<string>('NAME');
    setCurrentName(v: string) {
        this.currentName$.next(v);
    }

    public armBadgeOn$ = new BehaviorSubject<boolean>(true);
    setArmBadgeOn(o: boolean) {
        this.armBadgeOn$.next(o);
    }
    public chestBadgeOn$ = new BehaviorSubject<boolean>(true);
    setChestBadgeOn(o: boolean) {
        this.chestBadgeOn$.next(o);
    }

    public armBadgeSrc = '~/images/laliga-badge.png';
    public chestBadgeSrc = '~/images/fifa-badge.png';

    getClubs(): Club[] {
        return this.clubs;
    }

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
        this.setCurrentClubKitByIdx(0);
    }

    setCurrentClubKit(kit: Kit) {
        this.setCurrentClubKitByIdx(this.getCurrentClub().kits.indexOf(kit));
    }

    setCurrentClubKitByIdx(idx: number) {
        const kit = this.getCurrentClub().kits[idx];
        this.currentClubKitIdx = idx;
        this.currentClubKit$.next(kit);
    }

    getCurrentClubKitIdx(): number {
        return this.currentClubIdx;
    }
}