export const waoUrlMaps: Record<'dev' | 'test' | 'stage' | 'prod', Record<string, string>> = {
    dev: {
        fretex: 'hasuratest',
        avansas: 'test',
    },
    test: {},

    stage: {
        avansstage: 'stage',
        adopuswebpakke1: 'webpakke1',
        //brukerforum22: 'brukerforum22',
        fretex: 'hasuratest',
        //increo: 'increo',
    },
    prod: {
        demoprod: 'blue',
        //pitstop: 'pitstop',
        blaakorsfredrikstad: 'blakorsbredrikstad',
        //fretex: 'fretex',
        //mjosanker: 'mjosanker',
        //jobbintro: 'jobbintro',
        //sens: 'sens',
        //netped: 'netped',
        //veksttorget: 'veksttorget',
        //arbeidogvekst: 'arbeidogvekst',
        aski: 'askias',
        blakorsarboginkl: 'blakorsarboinkl',
        //inko: 'inko',
    },
}
