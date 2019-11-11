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
                imgSrcs: ['~/images/rm-home/back.png', '~/images/rm-home/angle.png', '~/images/rm-home/front.png'],
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
                imgSrcs: ['~/images/rm-away/back.png', '~/images/rm-away/angle.png', '~/images/rm-away/front.png'],
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
                imgSrcs: ['~/images/rm-third/back.png', '~/images/rm-third/angle.png', '~/images/rm-third/front.png'],
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
                imgSrcs: ['~/images/rm-home-gk/back.png', '~/images/rm-home-gk/angle.png', '~/images/rm-home-gk/front.png'],
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
                imgSrcs: ['~/images/rm-away-gk/back.png', '~/images/rm-away-gk/angle.png', '~/images/rm-away-gk/front.png'],
                brand: 'Adidas',
            },],
        },
        {
            name: 'Juventus',
            logo: '~/images/juv.png',
            background: '#4377a6',
            kits: [{
                color: '#000000',
                background: 'linear-gradient(77.76deg, #FD707E 39.83%, #F8CC75 93.4%)',
                name: 'Home',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                    nameFontClass: 'juv-name-font', numberFontClass: 'juv-number-font',
                },
                imgSrcs: ['~/images/juv-home/back.png', '~/images/juv-home/angle.png', '~/images/juv-home/front.png'],
                brand: 'Adidas',
            },
            {
                color: '#FFFFFF',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Away',
                year: '\'19-\'20',
                font: {
                    color: '#EA112C',
                    nameFontClass: 'juv-name-font', numberFontClass: 'juv-number-font',
                },
                imgSrcs: ['~/images/juv-away/back.png', '~/images/juv-away/angle.png', '~/images/juv-away/front.png'],
                brand: 'Adidas',
            },
            {
                color: '#026BA5',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Third',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                    nameFontClass: 'juv-name-font', numberFontClass: 'juv-number-font',
                },
                imgSrcs: ['~/images/juv-third/back.png', '~/images/juv-third/angle.png', '~/images/juv-third/front.png'],
                brand: 'Adidas',
            }],
        },
        {
            name: 'Arsenal',
            logo: '~/images/arsenal.png',
            background: '#4377a6',
            kits: [{
                color: '#F02632',
                background: 'linear-gradient(77.76deg, #FD707E 39.83%, #F8CC75 93.4%)',
                name: 'Home',
                year: '\'19-\'20',
                font: {
                    color: '#FFFFFF',
                    nameFontClass: 'arsenal-name-font', numberFontClass: 'arsenal-number-font',
                },
                imgSrcs: ['~/images/arsenal-home/back.png', '~/images/arsenal-home/angle.png', '~/images/arsenal-home/front.png'],
                brand: 'Adidas',
            },
            {
                color: '#FBE015',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Away',
                year: '\'19-\'20',
                font: {
                    color: '#121C4F',
                    nameFontClass: 'arsenal-name-font', numberFontClass: 'arsenal-number-font',
                },
                imgSrcs: ['~/images/arsenal-away/back.png', '~/images/arsenal-away/angle.png', '~/images/arsenal-away/front.png'],
                brand: 'Adidas',
            },
            {
                color: '#1B2C3C',
                background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
                name: 'Third',
                year: '\'19-\'20',
                font: {
                    color: '#FFEB0B',
                    nameFontClass: 'arsenal-name-font', numberFontClass: 'arsenal-number-font',
                },
                imgSrcs: ['~/images/arsenal-third/back.png', '~/images/arsenal-third/angle.png', '~/images/arsenal-third/front.png'],
                brand: 'Adidas',
            }],
        }
    ];

    private currentClubIdx = 0;
    public currentClub$ = new BehaviorSubject<Club>(this.clubs[this.currentClubIdx]);

    private currentClubKitIdx: number = 0;
    public currentClubKit$ = new BehaviorSubject<Kit>(this.clubs[this.currentClubIdx].kits[this.currentClubKitIdx]);

    private numInCart = 0;
    public numInCart$ = new BehaviorSubject<number>(this.numInCart);
    addToCart() {
        this.numInCart$.next(++this.numInCart);
    }

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

    public chestBadgeOn$ = new BehaviorSubject<boolean>(false);
    setChestBadgeOn(o: boolean) {
        this.chestBadgeOn$.next(o);
    }

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