import * as path from "path";
import * as fs from "fs/promises";
import { Politician } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

type politicianCreation = {
    PoliticianName: string;
    PoliticianState: string;
    PoliticianOffice: string;
    PoliticianIncumbency: boolean;
    PoliticianParty: string;
    PoliticianEmail: string;
    PoliticianAddress: string;
    PoliticianPhoneNumber: string;
    PoliticianURL: string;
};

@Injectable()
export class PoliticiansService {
    constructor(private prisma: PrismaService) {}

    async findByName(name: string): Promise<Politician | undefined> {
        return this.prisma.politician.findFirst({ where: { PoliticianName: name } });
    }

    async create(data: politicianCreation) {
        return this.prisma.politician.create({ data });
    }

    async getAll() {
        return this.prisma.politician.findMany();
    }

    async initializeAll() {
        const states = [
            "al",
            "ak",
            "az",
            "ar",
            "ca",
            "co",
            "ct",
            "de",
            "fl",
            "ga",
            "hi",
            // "id",
            // "il",
            // "in",
            // "ia",
            // "ks",
            // "ky",
            // "la",
            // "me",
            // "md",
            // "ma",
            // "mi",
            // "mn",
            // "ms",
            // "mo",
            // "mt",
            // "ne",
            // "nv",
            // "nh",
            // "nj",
            // "nm",
            // "ny",
            // "nc",
            // "nd",
            // "oh",
            // "ok",
            // "or",
            // "pa",
            // "ri",
            // "sc",
            // "sd",
            // "tn",
            // "tx",
            // "ut",
            // "vt",
            // "va",
            // "wa",
            // "wv",
            // "wi",
            // "wy",
        ];

        for (const state of states) {
            const data = await fs.readFile(path.join(__dirname, "../../src/politicians/data", `${state}.json`), "utf8");
            const json = JSON.parse(data);

            for (const official of json.officials) {
                const name = official.name;
                const party = official.party;

                let address = "";
                if (official.address) {
                    const address1_line1 = official.address[0].line1;
                    const address1_line2 = official.address[0].line2;
                    const address1_line3 = official.address[0].line3;
                    const address1_city = official.address[0].city;
                    const address1_state = official.address[0].state;
                    const address1_zip = official.address[0].zip;

                    address =
                        address1_line1 +
                        address1_line2 +
                        address1_line3 +
                        address1_city +
                        address1_state +
                        address1_zip;
                }

                let phone = "";
                if (official.phones) {
                    phone = official.phones[0];
                }

                let url = "";
                if (official.urls) {
                    url = official.urls[0];
                }

                let email = "";
                if (official.emails) {
                    email = official.emails[0];
                }

                // const channels = official.channels;
                // const channel1_type = channels[0].type;
                // const channel1_id = channels[0].id;

                await this.create({
                    PoliticianName: name,
                    PoliticianState: state,
                    PoliticianParty: party,
                    PoliticianEmail: email,
                    PoliticianAddress: address,
                    PoliticianPhoneNumber: phone,
                    PoliticianURL: url,
                    PoliticianOffice: "",
                    PoliticianIncumbency: false,
                });
            }
        }
    }
}
