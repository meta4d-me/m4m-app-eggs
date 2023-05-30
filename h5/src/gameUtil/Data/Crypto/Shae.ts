// 未用上先注掉 
// export class Shae {
//     /*
//      *
//      * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
//      * in FIPS PUB 180-1
//      *
//      * By lizq
//      *
//      * 2006-11-11
//      *
//      */
//     /*
//      *
//      * Configurable variables.
//      *
//      */
//     public hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
//     public chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
//     /*
//      *
//      * The main public to calculate message digest
//      *
//      */
//     public hex_sha1(s) {

//         return this.binb2hex(this.core_sha1(this.AlignSHA1(s)));

//     }

//     /*
//      *
//      * Perform a simple self-test to see if the VM is working
//      *
//      */
//     public sha1_vm_test() {

//         return this.hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";

//     }

//     /*
//      *
//      * Calculate the SHA-1 of an array of big-endian words, and a bit length
//      *
//      */
//     public core_sha1(blockArray) {

//         let x = blockArray; // append padding
//         let w = Array(80);

//         let a = 1732584193;

//         let b = -271733879;

//         let c = -1732584194;

//         let d = 271733878;

//         let e = -1009589776;

//         for (let i = 0; i < x.length; i += 16) // 每次处理512位 16*32
//         {

//             let olda = a;

//             let oldb = b;

//             let oldc = c;

//             let oldd = d;

//             let olde = e;

//             for (let j = 0; j < 80; j++) // 对每个512位进行80步操作
//             {

//                 if (j < 16) {
//                     w[j] = x[i + j];
//                 }else {
//                     w[j] = this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
//                 }

//                 let t = this.safe_add(this.safe_add(this.rol(a, 5), this.sha1_ft(j, b, c, d))
//                 , this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));

//                 e = d;

//                 d = c;

//                 c = this.rol(b, 30);

//                 b = a;

//                 a = t;

//             }

//             a = this.safe_add(a, olda);

//             b = this.safe_add(b, oldb);

//             c = this.safe_add(c, oldc);

//             d = this.safe_add(d, oldd);

//             e = this.safe_add(e, olde);

//         }

//         return new Array(a, b, c, d, e);

//     }

//     /*
//      *
//      * Perform the appropriate triplet combination public for the current
//      * iteration
//      *
//      * 返回对应F函数的值
//      *
//      */
//     public sha1_ft(t, b, c, d) {

//         if (t < 20) {
//             return (b & c) | ((~b) & d);
//         }

//         if (t < 40) {
//             return b ^ c ^ d;
//         }

//         if (t < 60) {
//             return (b & c) | (b & d) | (c & d);
//         }

//         return b ^ c ^ d; // t<80
//     }

//     /*
//      *
//      * Determine the appropriate additive constant for the current iteration
//      *
//      * 返回对应的Kt值
//      *
//      */
//     public sha1_kt(t) {

//         return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;

//     }

//     /*
//      *
//      * Add integers, wrapping at 2^32. This uses 16-bit operations internally
//      *
//      * to work around bugs in some JS interpreters.
//      *
//      * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
//      *
//      */
//     public safe_add(x, y) {

//         let lsw = (x & 0xFFFF) + (y & 0xFFFF);

//         let msw = (x >> 16) + (y >> 16) + (lsw >> 16);

//         return (msw << 16) | (lsw & 0xFFFF);

//     }

//     /*
//      *
//      * Bitwise rotate a 32-bit number to the left.
//      *
//      * 32位二进制数循环左移
//      *
//      */
//     public rol(num, cnt) {

//         return (num << cnt) | (num >>> (32 - cnt));

//     }

//     /*
//      *
//      * The standard SHA1 needs the input string to fit into a block
//      *
//      * This public align the input string to meet the requirement
//      *
//      */
//     public AlignSHA1(str) {

//         let nblk = ((str.length + 8) >> 6) + 1;
//         let blks = new Array(nblk * 16);

//         let i: number;
//         for (i = 0; i < nblk * 16; i++) {
//             blks[i] = 0;
//         }

//         for (i = 0; i < str.length; i++) {

//             blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
//         }

//         blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);

//         blks[nblk * 16 - 1] = str.length * 8;

//         return blks;

//     }

//     /*
//      *
//      * Convert an array of big-endian words to a hex string.
//      *
//      */
//     public binb2hex(binarray) {

//         // tslint:disable-next-line: variable-name
//         let hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";

//         let str = "";

//         for (let i = 0; i < binarray.length * 4; i++) {

//             str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +

//                 hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);

//         }

//         return str;

//     }

//     /*
//      * 获取游戏hash_key值
//      */
//     public getGameKey(uid, sid): string {
//         let jData: string[] = [];
//         let hData: string[] = [];
//         let cData: string[] = [];

//         let addict: string = "1";
//         let sha1key: string = "abcdef!@#$%6d2";
//         let source: string = "cafe";
//         let time: string = Math.round(new Date().getTime() / 1000)
//         .toString();
//         let fsid: string = sid;

//         cData.push(uid);
//         cData.push(time);
//         cData.push(sid);
//         cData.push(fsid);
//         cData.push(addict);
//         cData.push(source);

//         jData.push(cData.join("_"));
//         jData.push(sha1key);

//         let jString = jData.join("_");
//         let hString = this.hex_sha1(jString);

//         hData.push(hString);
//         hData.push(cData.join("|"));

//         return hData.join("|");
//     }

//     /**
//      * utf.js - UTF-8 <=> UTF-16 convertion
//      * Uint8Array To string
//      * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
//      * Version: 1.0
//      * LastModified: Dec 25 1999
//      * This library is free.  You can redistribute it and/or modify it.
//      *
//      * @param array
//      */
//     public GetUtf8ArrayToStr(array) {
//         // tslint:disable-next-line: one-variable-per-declaration
//         let out, i, len, c;
//         // tslint:disable-next-line: one-variable-per-declaration
//         let char2, char3;

//         out = "";
//         len = array.length;
//         i = 0;
//         while (i < len) {
//             c = array[i++];
//             switch (c >> 4) {
//                 case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
//                     // 0xxxxxxx
//                     out += String.fromCharCode(c);
//                     break;
//                 case 12: case 13:
//                     // 110x xxxx   10xx xxxx
//                     char2 = array[i++];
//                     out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//                     break;
//                 case 14:
//                     // 1110 xxxx  10xx xxxx  10xx xxxx
//                     char2 = array[i++];
//                     char3 = array[i++];
//                     out += String.fromCharCode(((c & 0x0F) << 12) |
//                         ((char2 & 0x3F) << 6) |
//                         ((char3 & 0x3F) << 0));
//                     break;
//                 default : out = "";
//             }
//         }

//         return out;
//     }

// }