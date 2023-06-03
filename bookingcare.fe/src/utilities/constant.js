import { toast } from 'react-toastify';

export const nameKeysValues = Object.freeze({
 //user
 user: 'user',
 userInfo: 'userInfo',
 isLoggedIn: 'isLoggedIn',
 accessToken: 'accessToken',

 //login, form, booking
 email: 'email',
 password: 'password',
 firstname: 'firstname',
 lastname: 'lastname',
 address: 'address',
 phone: 'phone',
 gender: 'gender',
 position: 'position',
 role: 'role',
 avatar: 'avatar',
 avatarBase64: 'avatarBase64',
 birthday: 'birthday',

 //app
 vi: 'vi',
 en: 'en',
 app: 'app',
 language: 'language',
 isLoadingSymbol: 'isLoadingSymbol',

 //doctorManager + extra + Speciality manager
 description: 'description',
 selectedDoctorId: 'selectedDoctorId',
 selectedDate: 'selectedDate',
 priceId: 'priceId',
 paymentId: 'paymentId',
 provinceId: 'provinceId',
 clinicId: 'clinicId',
 clinicNameN: 'clinicName',
 clinicAddressN: 'clinicAddress',
 noteN: 'note',
 specialityIdN: 'specialityId',
 createSpecialityN: 'createSpeciality',

 //doctor workdate
 today: 'Today',
 todayVi: 'Hôm nay',

 //others
 activeClass: 'actived',
 menuGroupClass: 'menuGroup',
});

export const defaultKeys = {
 //allcodes
 maleGender: 'M',
 doctorPos: 'P0',
 new: 'S1',

 //phan quyen, header
 adminRole: 'R1',
 doctorRole: 'R2',
 patientRole: 'R3',

 //doctorManager
 priceId: 'PRI1',
 paymentId: 'PAY1',
 provinceId: 'PRO1',
 specialityId: '1',
};

export const defaultValues = {
 noErrors: 0,
 delayTime: 500,
 notConnected: -1,

 //doctorManager
 noSelected: '',
 selecteALL: 'ALL',
 defaultMarkdown: {
  description: '',
  htmlContent: '',
  textContent: '',
 },

 defaultExtra: {
  priceId: 'PRI1',
  paymentId: 'PAY1',
  provinceId: 'PRO1',
  specialityId: '1',
  clinicName: '',
  clinicAddress: '',
  note: '',
 },
};

//types
export const typeKeyValue = Object.freeze({
 //form types
 textType: 'text',
 passwordType: 'password',
 selectType: 'select',
 fileType: 'file',
 emailType: 'email',
 numType: 'number',
 bufferType: 'Buffer',

 // allcodes of userManager comp
 roleType: 'ROLE',
 genderType: 'GENDER',
 positionType: 'POSITION',

 //allcodes of extra
 priceType: 'PRICE',
 paymentType: 'PAYMENT',
 provinceType: 'PROVINCE',

 //js types
 jsStringType: 'string',
 jsNumType: 'number',
 jsObjType: 'object',
 jsArrType: 'array',
 jsBufferType: 'Buffer',

 //booking modal
 datePickerType: 'datePickerType',
});

export const sortTypes = {
 noSorting: '0',
 increasingSort: '1',
 decreasingSort: '2',
};

export const dateFormat = Object.freeze({
 DMY: 'DD/MM/YYYY',
 dDM: 'dddd, DD/MM',
 dDMY: 'dddd - DD/MM/YYYY',
 weekdaysVI: `C.Nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7`.split('_'),
 weekdaysEN: `Sun_Mon_Tue_Wed_Thu_Fri_Sat`.split('_'),
});

export const LANGUAGES = {
 VI: nameKeysValues.vi,
 EN: nameKeysValues.en,
};

export const clientMessages = {
 emailErr: 'Email is not correct',
 passwordErr: 'At least 8 chars, including of upper/lower/number/special (@ * , ! ...)',
};

export const displayToast = {
 toastSuccess: (mess) => toast.success(mess ? mess : 'Successfully requested', { autoClose: 1000 }),
 toastError: (mess) => toast.error(mess ? mess : 'Failed requested'),
};

export const MockAllUsers = [
 { email: 'minh@gmail.com', firstname: 'Minh', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'khoa@gmail.com', firstname: 'Khoa', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 {
  email: 'lephuonganh@gmail.com',
  firstname: 'Anh',
  lastname: 'Lê Phương',
  address: 'Bình Thuận',
 },
 {
  email: 'phanductai920510@gmail.com',
  firstname: 'Tài',
  lastname: 'Phan Đức',
  address: 'dia chi q12',
 },
 { email: 'vanhoa@gmail.com', firstname: 'Van Hoa', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'loan2@q12.com', firstname: 'Loãng', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'Mai@gmail.com', firstname: 'Mái', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },

 { email: 'loan2@gmail.com', firstname: 'Loán', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },

 { email: 'vanHoa@gmail.com', firstname: 'Văn Hoa', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'thang@gmail.com', firstname: 'Thang', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'mai@gmail.com', firstname: 'Mai', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'loan@gmail.com', firstname: 'Loan', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 { email: 'hoa@gmail.com', firstname: 'Hoa 2', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
 {
  email: 'pntran@angiang.com',
  firstname: 'Trân',
  lastname: 'Phạm Ngọc',
  address: 'An Giang province',
 },
 { email: 'tintuc271@gmail.com', firstname: 'Admin', lastname: 'Phan Đức', address: 'Tphcm' },
 {
  email: 'mocnhi@gmail.com',
  firstname: 'Văn Hóa',
  lastname: 'Nguyễn Thị',
  address: 'Đắc Lắc',
 },
 { email: 'nhung@phoBo.co', firstname: 'Nhung', lastname: 'Nguyễn Thị', address: 'Đắc Lắc' },
];

export const doctorManagerMock = [
 {
  id: 51,
  firstname: 'Khuyên',
  lastname: 'Trần Minh',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 57,
  firstname: 'Bình',
  lastname: 'Võ Thanh',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 53,
  firstname: 'Hưng',
  lastname: 'Nguyễn Duy',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 54,
  firstname: 'Vi',
  lastname: 'Lê Thị',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 55,
  firstname: 'Xương',
  lastname: 'Trần Công',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 56,
  firstname: 'Phúc',
  lastname: 'Mai Văn',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 60,
  firstname: 'Hùng',
  lastname: 'Nguyễn Trọng',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 52,
  firstname: 'An',
  lastname: 'Đặng Thị Hoài',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
 {
  id: 58,
  firstname: 'Hương',
  lastname: 'Lý Thị Hoài',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },

 {
  id: 61,
  firstname: 'Vĩnh',
  lastname: 'Phạm Văn',
  avatar:
   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…LE/RVA9AABgAAdDpqKik5fCm9d39x3xowlGLldu3X8ttj/9k=...',
 },
];

// eslint-disable-next-line no-extend-native,
String.prototype.localeContains = function (sub) {
 let ascii = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
 return ascii(this).includes(ascii(sub)); //search string
};

// eslint-disable-next-line no-extend-native,
String.prototype.absolutelySearch = function (sub) {
 let ascii = (str) => str.normalize('NFC').replace(/[\u0300-\u036f]/g, '');
 return ascii(this).includes(ascii(sub)); //search string
};

//sorting string,
// eslint-disable-next-line no-extend-native,
String.prototype.sortByName = function (stringA) {
 let ascii = (stringB) => stringB.normalize('NFC').replace(/[\u0300-\u036f]/g, '');
 return ascii(this) > ascii(stringA); //this = string
};
