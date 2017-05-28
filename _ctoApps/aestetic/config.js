'use strict';

/*
	In this file the default configurations of AES and test vectors are defined. The default values
	can be changed by the user with the current exception of `defaults.blockSize` which is always
	16 bytes.

	The `defaults` variable contains the default values for Rijndael and AES ciphers. If they are
	changed, the resulting cipher is no longer Rijndael. This values are used to initialize the
	algorithm and to check the current settings against to see, if the current configuration conforms
	to the standard algorithm.
*/

const Chaining = {
	None: 0,
	CBC: 1,
	ECB: 2
};

const defaults = {

	/*
		The S-Box is a permutation of bytes. Every of the 256 possible values of a byte must occur
		exactly once.
	*/

	'sbox': [
		0x63, 0x7c, 0x77, 0x7b,  0xf2, 0x6b, 0x6f, 0xc5,
		0x30, 0x01, 0x67, 0x2b,  0xfe, 0xd7, 0xab, 0x76,
		0xca, 0x82, 0xc9, 0x7d,  0xfa, 0x59, 0x47, 0xf0,
		0xad, 0xd4, 0xa2, 0xaf,  0x9c, 0xa4, 0x72, 0xc0,
		0xb7, 0xfd, 0x93, 0x26,  0x36, 0x3f, 0xf7, 0xcc,
		0x34, 0xa5, 0xe5, 0xf1,  0x71, 0xd8, 0x31, 0x15,
		0x04, 0xc7, 0x23, 0xc3,  0x18, 0x96, 0x05, 0x9a,
		0x07, 0x12, 0x80, 0xe2,  0xeb, 0x27, 0xb2, 0x75,
		0x09, 0x83, 0x2c, 0x1a,  0x1b, 0x6e, 0x5a, 0xa0,
		0x52, 0x3b, 0xd6, 0xb3,  0x29, 0xe3, 0x2f, 0x84,
		0x53, 0xd1, 0x00, 0xed,  0x20, 0xfc, 0xb1, 0x5b,
		0x6a, 0xcb, 0xbe, 0x39,  0x4a, 0x4c, 0x58, 0xcf,
		0xd0, 0xef, 0xaa, 0xfb,  0x43, 0x4d, 0x33, 0x85,
		0x45, 0xf9, 0x02, 0x7f,  0x50, 0x3c, 0x9f, 0xa8,
		0x51, 0xa3, 0x40, 0x8f,  0x92, 0x9d, 0x38, 0xf5,
		0xbc, 0xb6, 0xda, 0x21,  0x10, 0xff, 0xf3, 0xd2,
		0xcd, 0x0c, 0x13, 0xec,  0x5f, 0x97, 0x44, 0x17,
		0xc4, 0xa7, 0x7e, 0x3d,  0x64, 0x5d, 0x19, 0x73,
		0x60, 0x81, 0x4f, 0xdc,  0x22, 0x2a, 0x90, 0x88,
		0x46, 0xee, 0xb8, 0x14,  0xde, 0x5e, 0x0b, 0xdb,
		0xe0, 0x32, 0x3a, 0x0a,  0x49, 0x06, 0x24, 0x5c,
		0xc2, 0xd3, 0xac, 0x62,  0x91, 0x95, 0xe4, 0x79,
		0xe7, 0xc8, 0x37, 0x6d,  0x8d, 0xd5, 0x4e, 0xa9,
		0x6c, 0x56, 0xf4, 0xea,  0x65, 0x7a, 0xae, 0x08,
		0xba, 0x78, 0x25, 0x2e,  0x1c, 0xa6, 0xb4, 0xc6,
		0xe8, 0xdd, 0x74, 0x1f,  0x4b, 0xbd, 0x8b, 0x8a,
		0x70, 0x3e, 0xb5, 0x66,  0x48, 0x03, 0xf6, 0x0e,
		0x61, 0x35, 0x57, 0xb9,  0x86, 0xc1, 0x1d, 0x9e,
		0xe1, 0xf8, 0x98, 0x11,  0x69, 0xd9, 0x8e, 0x94,
		0x9b, 0x1e, 0x87, 0xe9,  0xce, 0x55, 0x28, 0xdf,
		0x8c, 0xa1, 0x89, 0x0d,  0xbf, 0xe6, 0x42, 0x68,
		0x41, 0x99, 0x2d, 0x0f,  0xb0, 0x54, 0xbb, 0x16
	],

	/*
		The permute array permutes all bytes of a block. The numbers 0 to `defaults.blockSize`
		must occur exactly once.
	*/

	'permute': [
		0x00, 0x05, 0x0a, 0x0f,  0x04, 0x09, 0x0e, 0x03,
		0x08, 0x0d, 0x02, 0x07,  0x0c, 0x01, 0x06, 0x0b
	],

	/*
		Number of bytes that are processed. This number determines the size of `defaults.permute`
		and the size of the extended key. Currently, this value cannot be changed.
	*/

	'blockSize': 16,

	/*
		mapping bytes to the number of set bits
	*/
	'colorRamp': [
		0, 1, 1, 2,  1, 2, 2, 3,  1, 2, 2, 3,  2, 3, 3, 4,
		1, 2, 2, 3,  2, 3, 3, 4,  2, 3, 3, 4,  3, 4, 4, 5,
		1, 2, 2, 3,  2, 3, 3, 4,  2, 3, 3, 4,  3, 4, 4, 5,
		2, 3, 3, 4,  3, 4, 4, 5,  3, 4, 4, 5,  4, 5, 5, 6,

		1, 2, 2, 3,  2, 3, 3, 4,  2, 3, 3, 4,  3, 4, 4, 5,
		2, 3, 3, 4,  3, 4, 4, 5,  3, 4, 4, 5,  4, 5, 5, 6,
		2, 3, 3, 4,  3, 4, 4, 5,  3, 4, 4, 5,  4, 5, 5, 6,
		3, 4, 4, 5,  4, 5, 5, 6,  5, 5, 5, 6,  5, 6, 6, 7,

		1, 2, 2, 3,  2, 3, 3, 4,  2, 3, 3, 4,  3, 4, 4, 5,
		2, 3, 3, 4,  3, 4, 4, 5,  3, 4, 4, 5,  4, 5, 5, 6,
		2, 3, 3, 4,  3, 4, 4, 5,  3, 4, 4, 5,  4, 5, 5, 6,
		3, 4, 4, 5,  4, 5, 5, 6,  5, 5, 5, 6,  5, 6, 6, 7,

		2, 3, 3, 4,  3, 4, 4, 5,  3, 4, 4, 5,  4, 5, 5, 6,
		3, 4, 4, 5,  4, 5, 5, 6,  5, 5, 5, 6,  5, 6, 6, 7,
		3, 4, 4, 5,  4, 5, 5, 6,  5, 5, 5, 6,  5, 6, 6, 7,
		4, 5, 5, 6,  5, 6, 6, 7,  6, 6, 6, 7,  6, 7, 7, 8
	]
};

/*
    Define the standard rounds used for AES
 */
const std_rounds = {
    minRijndael16: 10,
    minRijndael20: 11,
    minRijndael24: 12,
    minRijndael28: 13,
	aes128: 10,
	aes192: 12,
	aes256: 14,
    maxRijndael: 14
};

/*
	The `testcases` is an array of settings that together with the `default` settings form
	configurations for which the expected encrypted values are documented. These are the proofs
	for the correct function of the algorithm.

	Currently we have one entry for each AES mode. So the entries are a quick way to choose the
	correct standard configurations. The values are documented in the original FIPS documentation.

	The first entry will be used on startup.
*/

const test_keys = {
	aes128: [
		0x2b, 0x7e, 0x15, 0x16,  0x28, 0xae, 0xd2, 0xa6,
		0xab, 0xf7, 0x15, 0x88,  0x09, 0xcf, 0x4f, 0x3c
	],
	aes192: [
		0x8e, 0x73, 0xb0, 0xf7,  0xda, 0x0e, 0x64, 0x52,
		0xc8, 0x10, 0xf3, 0x2b,  0x80, 0x90, 0x79, 0xe5,
		0x62, 0xf8, 0xea, 0xd2,  0x52, 0x2c, 0x6b, 0x7b
	],
	aes256: [
		0x60, 0x3d, 0xeb, 0x10,  0x15, 0xca, 0x71, 0xbe,
		0x2b, 0x73, 0xae, 0xf0,  0x85, 0x7d, 0x77, 0x81,
		0x1f, 0x35, 0x2c, 0x07,  0x3b, 0x61, 0x08, 0xd7,
		0x2d, 0x98, 0x10, 0xa3,  0x09, 0x14, 0xdf, 0xf4
	]
};
const test_inputs = [
	[
		0x6b, 0xc1, 0xbe, 0xe2,  0x2e, 0x40, 0x9f, 0x96,
		0xe9, 0x3d, 0x7e, 0x11,  0x73, 0x93, 0x17, 0x2a
	], [
		0xae, 0x2d, 0x8a, 0x57,  0x1e, 0x03, 0xac, 0x9c,
		0x9e, 0xb7, 0x6f, 0xac,  0x45, 0xaf, 0x8e, 0x51
	], [
		0x30, 0xc8, 0x1c, 0x46,  0xa3, 0x5c, 0xe4, 0x11,
		0xe5, 0xfb, 0xc1, 0x19,  0x1a, 0x0a, 0x52, 0xef
	], [
		0xf6, 0x9f, 0x24, 0x45,  0xdf, 0x4f, 0x9b, 0x17,
		0xad, 0x2b, 0x41, 0x7b,  0xe6, 0x6c, 0x37, 0x10
	]
];
const test_iv = [
    0x00, 0x01, 0x02, 0x03,  0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0A, 0x0B,  0x0C, 0x0D, 0x0E, 0x0F
];

const testcases = [
	{
		name: 'FIPS: AES-256',
		key: [
			0x00, 0x01, 0x02, 0x03,  0x04, 0x05, 0x06, 0x07,
			0x08, 0x09, 0x0a, 0x0b,  0x0c, 0x0d, 0x0e, 0x0f,
			0x10, 0x11, 0x12, 0x13,  0x14, 0x15, 0x16, 0x17,
			0x18, 0x19, 0x1a, 0x1b,  0x1c, 0x1d, 0x1e, 0x1f
		],
		rounds: std_rounds.aes256,
		input: [
			0x00, 0x11, 0x22, 0x33,  0x44, 0x55, 0x66, 0x77,
			0x88, 0x99, 0xaa, 0xbb,  0xcc, 0xdd, 0xee, 0xff
		],
		encoded: [
			0x8e, 0xa2, 0xb7, 0xca,  0x51, 0x67, 0x45, 0xbf,
        	0xea, 0xfc, 0x49, 0x90,  0x4b, 0x49, 0x60, 0x89
		],
		colored: false,
		chaining: Chaining.None
	}, {
		name: 'FIPS: AES-128',
		key: [
			0x00, 0x01, 0x02, 0x03,  0x04, 0x05, 0x06, 0x07,
			0x08, 0x09, 0x0a, 0x0b,  0x0c, 0x0d, 0x0e, 0x0f
		],
		rounds: std_rounds.aes128,
		input: [
			0x00, 0x11, 0x22, 0x33,  0x44, 0x55, 0x66, 0x77,
			0x88, 0x99, 0xaa, 0xbb,  0xcc, 0xdd, 0xee, 0xff
		],
		encoded: [
			0x69, 0xc4, 0xe0, 0xd8,  0x6a, 0x7b, 0x04, 0x30,
			0xd8, 0xcd, 0xb7, 0x80,  0x70, 0xb4, 0xc5, 0x5a
		],
		colored: false,
		chaining: Chaining.None
	}, {
		name: 'FIPS: AES-192',
		key: [
			0x00, 0x01, 0x02, 0x03,  0x04, 0x05, 0x06, 0x07,
			0x08, 0x09, 0x0a, 0x0b,  0x0c, 0x0d, 0x0e, 0x0f,
			0x10, 0x11, 0x12, 0x13,  0x14, 0x15, 0x16, 0x17
		],
		rounds: std_rounds.aes192,
		input: [
			0x00, 0x11, 0x22, 0x33,  0x44, 0x55, 0x66, 0x77,
			0x88, 0x99, 0xaa, 0xbb,  0xcc, 0xdd, 0xee, 0xff
		],
		encoded: [
        	0xdd, 0xa9, 0x7c, 0xa4,  0x86, 0x4c, 0xdf, 0xe0,
        	0x6e, 0xaf, 0x70, 0xa0,  0xec, 0x0d, 0x71, 0x91
		],
		colored: false,
		chaining: Chaining.None
	}, {
		name: 'colored AES-128',
		key: [
			0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00,
			0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00
		],
		rounds: std_rounds.aes128,
		input: [
			0x00, 0x00, 0x01, 0x01,  0x03, 0x03, 0x07, 0x07,
			0x0f, 0x0f, 0x1f, 0x1f,  0x3f, 0x3f, 0x7f, 0x7f
		],
		encoded: [
			0xc7, 0xd1, 0x24, 0x19,  0x48, 0x9e, 0x3b, 0x62,
			0x33, 0xa2, 0xc5, 0xa7,  0xf4, 0x56, 0x31, 0x72
		],
		colored: true,
		chaining: Chaining.None
	}, {
		name: 'AES/ECB-128-1',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[0],
		encoded: [
			0x3a, 0xd7, 0x7b, 0xb4,  0x0d, 0x7a, 0x36, 0x60,
			0xa8, 0x9e, 0xca, 0xf3,  0x24, 0x66, 0xef, 0x97,
            0xa2, 0x54, 0xbe, 0x88,  0xe0, 0x37, 0xdd, 0xd9,
            0xd7, 0x9f, 0xb6, 0x41,  0x1c, 0x3f, 0x9d, 0xf8
		],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-128-2',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[1],
		encoded: [
			0xf5, 0xd3, 0xd5, 0x85,  0x03, 0xb9, 0x69, 0x9d,
			0xe7, 0x85, 0x89, 0x5a,  0x96, 0xfd, 0xba, 0xaf,
            0xa2, 0x54, 0xbe, 0x88,  0xe0, 0x37, 0xdd, 0xd9,
            0xd7, 0x9f, 0xb6, 0x41,  0x1c, 0x3f, 0x9d, 0xf8
		],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-128-3',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[2],
		encoded: [
			0x43, 0xb1, 0xcd, 0x7f,  0x59, 0x8e, 0xce, 0x23,
			0x88, 0x1b, 0x00, 0xe3,  0xed, 0x03, 0x06, 0x88,
            0xa2, 0x54, 0xbe, 0x88,  0xe0, 0x37, 0xdd, 0xd9,
            0xd7, 0x9f, 0xb6, 0x41,  0x1c, 0x3f, 0x9d, 0xf8
		],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-128-4',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[3],
		encoded: [
			0x7b, 0x0c, 0x78, 0x5e,  0x27, 0xe8, 0xad, 0x3f,
			0x82, 0x23, 0x20, 0x71,  0x04, 0x72, 0x5d, 0xd4,
            0xa2, 0x54, 0xbe, 0x88,  0xe0, 0x37, 0xdd, 0xd9,
            0xd7, 0x9f, 0xb6, 0x41,  0x1c, 0x3f, 0x9d, 0xf8
		],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-192-1',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[0],
		encoded: [
			0xbd, 0x33, 0x4f, 0x1d,  0x6e, 0x45, 0xf2, 0x5f,
			0xf7, 0x12, 0xa2, 0x14,  0x57, 0x1f, 0xa5, 0xcc,
            0xda, 0xa0, 0xaf, 0x07,  0x4b, 0xd8, 0x08, 0x3c,
            0x8a, 0x32, 0xd4, 0xfc,  0x56, 0x3c, 0x55, 0xcc
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-192-2',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[1],
		encoded: [
			0x97, 0x41, 0x04, 0x84,  0x6d, 0x0a, 0xd3, 0xad,
			0x77, 0x34, 0xec, 0xb3,  0xec, 0xee, 0x4e, 0xef,
            0xda, 0xa0, 0xaf, 0x07,  0x4b, 0xd8, 0x08, 0x3c,
            0x8a, 0x32, 0xd4, 0xfc,  0x56, 0x3c, 0x55, 0xcc
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-192-3',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[2],
		encoded: [
			0xef, 0x7a, 0xfd, 0x22,  0x70, 0xe2, 0xe6, 0x0a,
			0xdc, 0xe0, 0xba, 0x2f,  0xac, 0xe6, 0x44, 0x4e,
            0xda, 0xa0, 0xaf, 0x07,  0x4b, 0xd8, 0x08, 0x3c,
            0x8a, 0x32, 0xd4, 0xfc,  0x56, 0x3c, 0x55, 0xcc
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-192-4',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[3],
		encoded: [
			0x9a, 0x4b, 0x41, 0xba,  0x73, 0x8d, 0x6c, 0x72,
			0xfb, 0x16, 0x69, 0x16,  0x03, 0xc1, 0x8e, 0x0e,
            0xda, 0xa0, 0xaf, 0x07,  0x4b, 0xd8, 0x08, 0x3c,
            0x8a, 0x32, 0xd4, 0xfc,  0x56, 0x3c, 0x55, 0xcc
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-256-1',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[0],
		encoded: [
			0xf3, 0xee, 0xd1, 0xbd,  0xb5, 0xd2, 0xa0, 0x3c,
			0x06, 0x4b, 0x5a, 0x7e,  0x3d, 0xb1, 0x81, 0xf8,
            0x4c, 0x45, 0xdf, 0xb3,  0xb3, 0xb4, 0x84, 0xec,
            0x35, 0xb0, 0x51, 0x2d,  0xc8, 0xc1, 0xc4, 0xd6
		],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-256-2',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[1],
		encoded: [
			0x59, 0x1c, 0xcb, 0x10,  0xd4, 0x10, 0xed, 0x26,
			0xdc, 0x5b, 0xa7, 0x4a,  0x31, 0x36, 0x28, 0x70,
            0x4c, 0x45, 0xdf, 0xb3,  0xb3, 0xb4, 0x84, 0xec,
            0x35, 0xb0, 0x51, 0x2d,  0xc8, 0xc1, 0xc4, 0xd6
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-256-3',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[2],
		encoded: [
			0xb6, 0xed, 0x21, 0xb9,  0x9c, 0xa6, 0xf4, 0xf9,
			0xf1, 0x53, 0xe7, 0xb1,  0xbe, 0xaf, 0xed, 0x1d,
            0x4c, 0x45, 0xdf, 0xb3,  0xb3, 0xb4, 0x84, 0xec,
            0x35, 0xb0, 0x51, 0x2d,  0xc8, 0xc1, 0xc4, 0xd6
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/ECB-256-4',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[3],
		encoded: [
			0x23, 0x30, 0x4b, 0x7a,  0x39, 0xf9, 0xf3, 0xff,
			0x06, 0x7d, 0x8d, 0x8f,  0x9e, 0x24, 0xec, 0xc7,
            0x4c, 0x45, 0xdf, 0xb3,  0xb3, 0xb4, 0x84, 0xec,
            0x35, 0xb0, 0x51, 0x2d,  0xc8, 0xc1, 0xc4, 0xd6
        ],
		colored: false,
		chaining: Chaining.ECB
	}, {
		name: 'AES/CBC-128-1',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[0],
		iv: test_iv,
		encoded: [
			0x76, 0x49, 0xab, 0xac,  0x81, 0x19, 0xb2, 0x46,
			0xce, 0xe9, 0x8e, 0x9b,  0x12, 0xe9, 0x19, 0x7d,
            0x89, 0x64, 0xe0, 0xb1,  0x49, 0xc1, 0x0b, 0x7b,
            0x68, 0x2e, 0x6e, 0x39,  0xaa, 0xeb, 0x73, 0x1c
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-128-2',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[1],
		iv: [
            0x76, 0x49, 0xAB, 0xAC,  0x81, 0x19, 0xB2, 0x46,
            0xCE, 0xE9, 0x8E, 0x9B,  0x12, 0xE9, 0x19, 0x7D
        ],
		encoded: [
			0x50, 0x86, 0xcb, 0x9b,  0x50, 0x72, 0x19, 0xee,
			0x95, 0xdb, 0x11, 0x3a,  0x91, 0x76, 0x78, 0xb2,
            0x55, 0xe2, 0x1d, 0x71,  0x00, 0xb9, 0x88, 0xff,
            0xec, 0x32, 0xfe, 0xea,  0xfa, 0xf2, 0x35, 0x38
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-128-3',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[2],
		iv: [
            0x50, 0x86, 0xCB, 0x9B,  0x50, 0x72, 0x19, 0xEE,
            0x95, 0xDB, 0x11, 0x3A,  0x91, 0x76, 0x78, 0xB2
        ],
		encoded: [
			0x73, 0xbe, 0xd6, 0xb8,  0xe3, 0xc1, 0x74, 0x3b,
			0x71, 0x16, 0xe6, 0x9e,  0x22, 0x22, 0x95, 0x16,
            0xf6, 0xec, 0xcd, 0xa3,  0x27, 0xbf, 0x8e, 0x5e,
            0xc4, 0x37, 0x18, 0xb0,  0x03, 0x9a, 0xdc, 0xeb
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-128-4',
		key: test_keys.aes128,
		rounds: std_rounds.aes128,
		input: test_inputs[3],
		iv: [
            0x73, 0xBE, 0xD6, 0xB8,  0xE3, 0xC1, 0x74, 0x3B,
            0x71, 0x16, 0xE6, 0x9E,  0x22, 0x22, 0x95, 0x16
        ],
		encoded: [
			0x3f, 0xf1, 0xca, 0xa1,  0x68, 0x1f, 0xac, 0x09,
			0x12, 0x0e, 0xca, 0x30,  0x75, 0x86, 0xe1, 0xa7,
            0x8c, 0xb8, 0x28, 0x07,  0x23, 0x0e, 0x13, 0x21,
            0xd3, 0xfa, 0xe0, 0x0d,  0x18, 0xcc, 0x20, 0x12
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-192-1',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[0],
		iv: test_iv,
		encoded: [
			0x4f, 0x02, 0x1d, 0xb2,  0x43, 0xbc, 0x63, 0x3d,
			0x71, 0x78, 0x18, 0x3a,  0x9f, 0xa0, 0x71, 0xe8,
            0xa6, 0x47, 0xf1, 0x64,  0x3b, 0x94, 0x81, 0x2a,
            0x17, 0x5a, 0x13, 0xc8,  0xfa, 0x20, 0x14, 0xb2
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-192-2',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[1],
		iv: [
            0x4F, 0x02, 0x1D, 0xB2,  0x43, 0xBC, 0x63, 0x3D,
            0x71, 0x78, 0x18, 0x3A,  0x9F, 0xA0, 0x71, 0xE8
        ],
		encoded: [
			0xb4, 0xd9, 0xad, 0xa9,  0xad, 0x7d, 0xed, 0xf4,
			0xe5, 0xe7, 0x38, 0x76,  0x3f, 0x69, 0x14, 0x5a,
            0xc8, 0x1c, 0xa9, 0x9c,  0x3a, 0x1e, 0x88, 0x3f,
            0xa8, 0xd8, 0x34, 0x31,  0x6a, 0x22, 0x75, 0xec
        ],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-192-3',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[2],
		iv: [
            0xB4, 0xD9, 0xAD, 0xA9,  0xAD, 0x7D, 0xED, 0xF4,
            0xE5, 0xE7, 0x38, 0x76,  0x3F, 0x69, 0x14, 0x5A
        ],
		encoded: [
			0x57, 0x1b, 0x24, 0x20,  0x12, 0xfb, 0x7a, 0xe0,
			0x7f, 0xa9, 0xba, 0xac,  0x3d, 0xf1, 0x02, 0xe0,
            0xc5, 0x4f, 0xcb, 0xc6,  0xdb, 0x74, 0x24, 0xcb,
            0x26, 0x8f, 0x58, 0x8f,  0x83, 0x29, 0x20, 0x23
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-192-4',
		key: test_keys.aes192,
		rounds: std_rounds.aes192,
		input: test_inputs[3],
		iv: [
            0x57, 0x1B, 0x24, 0x20,  0x12, 0xFB, 0x7A, 0xE0,
            0x7F, 0xA9, 0xBA, 0xAC,  0x3D, 0xF1, 0x02, 0xE0
        ],
		encoded: [
			0x08, 0xb0, 0xe2, 0x79,  0x88, 0x59, 0x88, 0x81,
			0xd9, 0x20, 0xa9, 0xe6,  0x4f, 0x56, 0x15, 0xcd,
            0x61, 0x2c, 0xcd, 0x79,  0x22, 0x4b, 0x35, 0x09,
            0x35, 0xd4, 0x5d, 0xd6,  0xa9, 0x8f, 0x81, 0x76
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-256-1',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[0],
		iv: test_iv,
		encoded: [
			0xf5, 0x8c, 0x4c, 0x04,  0xd6, 0xe5, 0xf1, 0xba,
			0x77, 0x9e, 0xab, 0xfb,  0x5f, 0x7b, 0xfb, 0xd6,
            0x48, 0x5a, 0x5c, 0x81,  0x51, 0x9c, 0xf3, 0x78,
            0xfa, 0x36, 0xd4, 0x2b,  0x85, 0x47, 0xed, 0xc0
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-256-2',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[1],
		iv: [
            0xF5, 0x8C, 0x4C, 0x04,  0xD6, 0xE5, 0xF1, 0xBA,
            0x77, 0x9E, 0xAB, 0xFB,  0x5F, 0x7B, 0xFB, 0xD6
        ],
		encoded: [
			0x9c, 0xfc, 0x4e, 0x96,  0x7e, 0xdb, 0x80, 0x8d,
			0x67, 0x9f, 0x77, 0x7b,  0xc6, 0x70, 0x2c, 0x7d,
            0x3a, 0x3a, 0xa5, 0xe0,  0x21, 0x3d, 0xb1, 0xa9,
            0x90, 0x1f, 0x90, 0x36,  0xcf, 0x51, 0x02, 0xd2
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-256-3',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[2],
		iv: [
            0x9C, 0xFC, 0x4E, 0x96,  0x7E, 0xDB, 0x80, 0x8D,
            0x67, 0x9F, 0x77, 0x7B,  0xC6, 0x70, 0x2C, 0x7D
        ],
		encoded: [
			0x39, 0xf2, 0x33, 0x69,  0xa9, 0xd9, 0xba, 0xcf,
			0xa5, 0x30, 0xe2, 0x63,  0x04, 0x23, 0x14, 0x61,
            0x2f, 0x8d, 0xa7, 0x07,  0x64, 0x3c, 0x90, 0xa6,
            0xf7, 0x32, 0xb3, 0xde,  0x1d, 0x3f, 0x5c, 0xee
		],
		colored: false,
		chaining: Chaining.CBC
	}, {
		name: 'AES/CBC-256-4',
		key: test_keys.aes256,
		rounds: std_rounds.aes256,
		input: test_inputs[3],
		iv: [
            0x39, 0xF2, 0x33, 0x69,  0xA9, 0xD9, 0xBA, 0xCF,
            0xA5, 0x30, 0xE2, 0x63,  0x04, 0x23, 0x14, 0x61
        ],
		encoded: [
			0xb2, 0xeb, 0x05, 0xe2,  0xc3, 0x9b, 0xe9, 0xfc,
			0xda, 0x6c, 0x19, 0x07,  0x8c, 0x6a, 0x9d, 0x1b,
            0x3f, 0x46, 0x17, 0x96,  0xd6, 0xb0, 0xd6, 0xb2,
            0xe0, 0xc2, 0xa7, 0x2b,  0x4d, 0x80, 0xe6, 0x44
		],
		colored: false,
		chaining: Chaining.CBC
	}
];

exports.defaults = defaults;
exports.testcases = testcases;
exports.Chaining = Chaining;