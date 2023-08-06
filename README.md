#  API ข้อมูลผู้ใช้

โครงการนี้ให้ API ง่าย ๆ สำหรับจัดการข้อมูลผู้ใช้ด้วย Firebase Realtime Database ซึ่ง API ช่วยให้คุณเรียกดูข้อมูลผู้ใช้ สร้างผู้ใช้ใหม่ อัปเดตข้อมูลผู้ใช้ และลบผู้ใช้ได้

## Base URL

http://localhost:3699


## Endpoints

### GET /data

- คำอธิบาย: เรียกดูข้อมูลผู้ใช้ทั้งหมดจาก Firebase Realtime Database
- วิธีการร้องขอ: GET
- URL ของร้องขอ: /data
- ข้อมูลตอบกลับ:

```json
{
    "password": "[Your Password]",
    "username": "[Your Username]"
}
```

- รหัสสถานะตอบกลับ:
- 200: OK - การร้องขอสำเร็จ
- 500: Internal Server Error - เกิดข้อผิดพลาดขณะดึงข้อมูล

### POST /data

- คำอธิบาย: เพิ่มข้อมูลผู้ใช้ใหม่เข้าสู่ Firebase Realtime Database
- วิธีการร้องขอ: POST
- URL ของร้องขอ: /data
- ตัวอย่าง body ของร้องขอ:

```json
{
    "username": "newuser",
    "password": "newpassword"
}
```
- ข้อมูลตอบกลับ:
```json
{
    "message": "เพิ่มข้อมูลสำเร็จ"
}
```

- รหัสสถานะตอบกลับ:
- 200: OK - การเพิ่มข้อมูลสำเร็จ
- 400: Bad Request - การร้องขอไม่มีฟิลด์ที่ต้องการหรือมีข้อมูลไม่ถูกต้อง
- 500: Internal Server Error - เกิดข้อผิดพลาดขณะเพิ่มข้อมูล

### DELETE /data/:username

- คำอธิบาย: ลบข้อมูลผู้ใช้จาก Firebase Realtime Database โดยใช้ชื่อผู้ใช้ที่กำหนด
- วิธีการร้องขอ: DELETE
- URL ของร้องขอ: /data/:username
- ข้อมูลตอบกลับ:
```json
{
    "message": "ลบข้อมูลสำเร็จ"
}
```
- รหัสสถานะตอบกลับ:
- 200: OK - การลบข้อมูลสำเร็จ
- 400: Bad Request - การร้องขอไม่มีพารามิเตอร์ username
- 500: Internal Server Error - เกิดข้อผิดพลาดขณะลบข้อมูล

### PUT /data/:username

- คำอธิบาย: อัปเดตข้อมูลผู้ใช้ใน Firebase Realtime Database โดยใช้ชื่อผู้ใช้ที่กำหนด
- วิธีการร้องขอ: PUT
- URL ของร้องขอ: /data/:username
- ตัวอย่าง body ของร้องขอ:
```json
{
    "password": "updatedpassword"
}
```
- ข้อมูลตอบกลับ:
```json
{
    "message": "อัปเดตข้อมูลสำเร็จ"
}
```
- รหัสสถานะตอบกลับ:
- 200: OK - การอัปเดตข้อมูลสำเร็จ
- 400: Bad Request - การร้องขอไม่มีพารามิเตอร์ username หรือมีข้อมูลไม่ถูกต้อง
- 500: Internal Server Error - เกิดข้อผิดพลาดขณะอัปเดตข้อมูล

## วิธีใช้

1. คลอน (Clone) โครงการไปยังเครื่องหมายเลข
2. ติดตั้งส่วนสำหรับให้บริการ (dependencies) โดยใช้ `npm install`
3. เปลี่ยน `path/to/serviceAccountKey.json` ใน `app.js` ให้เป็นที่อยู่ของคีย์บัญชี Firebase Admin SDK จริงของคุณ
4. เริ่มเซิร์ฟเวอร์ด้วย `npm start`
5. ใช้เครื่องมือเช่น Postman เพื่อใช้งาน API ด้วยเส้นทางที่ให้มา

## ส่วนขึ้นต้น (Dependencies)

- express: 4.17.1
- firebase-admin:
