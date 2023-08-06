const express = require('express');
const app = express();

const admin = require('firebase-admin');

const serviceAccount = require('./server/serviceAccountKey.json');
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ksongie-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const db = admin.database();

app.get('/data', (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'กรุณาระบุค่า username ใน query parameter' });
    }

    db.ref('users/' + username).once('value')
        .then(snapshot => {
            const data = snapshot.val();

            if (!data) {
                return res.status(404).json({ error: 'ไม่พบข้อมูลผู้ใช้' });
            }

            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอ่านข้อมูล' });
        });
});

app.post('/data', (req, res) => {
    const newData = req.body;
    const username = newData.username;

    if (!username) {
        return res.status(400).json({ error: 'กรุณาระบุค่า username ในข้อมูลที่ส่งมา' });
    }

    db.ref('users/' + username).set(newData)
        .then(() => {
            res.json({ message: 'เพิ่มข้อมูลสำเร็จ' });
        })
        .catch(error => {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
        });
});

app.delete('/data', (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'กรุณาระบุค่า username ในพารามิเตอร์ของ URL' });
    }

    db.ref('users/' + username).remove()
        .then(() => {
            res.json({ message: 'ลบข้อมูลสำเร็จ' });
        })
        .catch(error => {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
        });
});

app.put('/data/', (req, res) => {
    const username = req.query.username;
    const newData = req.body;

    if (!username) {
        return res.status(400).json({ error: 'กรุณาระบุค่า username ในพารามิเตอร์ของ URL' });
    }

    db.ref('users/' + username).update(newData)
        .then(() => {
            res.json({ message: 'อัปเดตข้อมูลสำเร็จ' });
        })
        .catch(error => {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
        });
});



const port = 3699; // เปลี่ยนตามต้องการ

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});