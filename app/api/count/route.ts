
import { Database, RunResult } from 'sqlite3';

// Open the database connection
const db = new Database('/relay/relay.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.run(`
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    count INTEGER DEFAULT 0
  )
`);

interface IPAddress {
    ip: string;
}

const logIP = (ip: string, db: Database): Promise<RunResult> => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO requests (ip) VALUES (?)',
            [ip],
            function (err: Error | null) {
                console.log('Inserted new row', err);
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this);
                }
            }
        );
    });
};

const loadSeq = (): Promise<IPAddress[]> => {
    return new Promise((resolve, reject) => {
        db.all("SELECT DISTINCT ip from requests", [], (err, rows: IPAddress[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    })
}

var NO = -1;
const ipNumberMap: Map<string, number> = new Map<string, number>();

export async function GET(request: Request) {

    if (request.headers.get('x-custom-ip') && NO == -1) {
        const rows = await loadSeq()
        NO = rows.length;
        for (let i = 0; i < rows.length; i++) {
            const item = rows[i];
            ipNumberMap.set(item.ip, i + 1);
        }
    }

    const ip = request.headers.get('x-custom-ip') ?? request.headers.get('x-forwarded-for') ?? ""

    try {
        logIP(ip, db);
    } catch (err) {
        console.error(err);
    }

    if (ipNumberMap.get(ip)) {
        return Response.json({ no: ipNumberMap.get(ip) });
    } else {
        NO += 1;
        ipNumberMap.set(ip, NO);
        return Response.json({ no: NO });
    }


}

export async function POST(request: Request) {

    const backup = Object.fromEntries(ipNumberMap);
    console.log('backup', backup); 
    const json = await request.json();
    NO = 0;
    ipNumberMap.clear();
    for (let i = 0; i < json.length; i++) {
        const item = json[i];
        ipNumberMap.set(item.ip, i+1);
    }
    
    return Response.json({ status: 'success', backup: backup });
}