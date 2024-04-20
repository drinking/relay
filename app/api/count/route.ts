
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

const ipNumberMap: Map<string, number> = new Map<string, number>();
var NO = 0;

export async function GET(request: Request) {

    if (NO == 0) {
        // TODO load map from dabatase
    }

    const ip = request.headers.get('X-Custom-IP') ?? ""

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