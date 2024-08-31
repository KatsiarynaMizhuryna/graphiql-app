import { config } from 'dotenv';
config({ path: '.env.local' });

describe('Config', () => {
  beforeEach(() => {
    // Сбрасываем кеш модулей перед каждым тестом
    jest.resetModules();

    // Мокируем переменные окружения
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'firebase_api_key';
  });

  it('should have correct serverConfig values', () => {
    const { serverConfig } = require('../../config');

    expect(serverConfig.cookieName).toBe('AuthToken');
    expect(serverConfig.cookieSignatureKeys).toEqual(['secret1', 'secret2']);
    expect(serverConfig.cookieSerializeOptions.secure).toBe(false);
    expect(serverConfig.serviceAccount).toEqual({
      projectId: 'graphql-client-app',
      clientEmail:
        'firebase-adminsdk-trz81@graphql-client-app.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC94N9QpCQyLrSg\nnQfpE6EnNLTQRgzIn6Ewsdp8kXz1pBmHVGKIJZvEGzpennYwLeiDySNO17NgurNt\n+5goFmRtnmt4bCOm7F5N8BBSyq4gDRPnWwaNHeuUNKFll4O4nvaCzD5S3at99I4p\nxqxyzoo41f2bHaHhMzHfmZw2O0sNxIGLRUQCZhkdocKgTo9ouMD1SpU/dj39VvaL\nHIQQ23XMllE3mXkM9Ev5lYUcZd7bVFUV+xWJG7aYx96SEnIxktn8uWw7qF3JD77g\naW50CT8Uts5z0S7l55+iuh7anW3sayUDo0IDMCmrKONYWBeHS7wzzm+/MUwQjkds\nBNM9vfBHAgMBAAECggEAALsIRkWovqlaWDyHxsL6Eu4LfLpVm0IDUJjRQpBxaXqM\n/0MjsUAVINnf+B7mTS99XmBxlSs+9/IlSu41utXB44AWtsW9FLaCcwynlhdMjeKu\n/xa6aDmYv0m9OJMEK+YvWaJ9N5FocwQeteobSMJ4Wq6hcALbAsRRKU9B1XLrSi1u\ngtm0n49BjeS0h68WkmWF5Popc+DR3+e7oTinvnN5iz+FWOJ957SVdURewe8+hACg\npfGYR5eSXMT+eJdmb7IUyrZgefKZTtkWRjSMrejT8PBKTh36iSNsbxgFPFzFsqVs\n2/wHJ0eFwDNvDS/tON7PcAwQ9vL5iEfN0s2AebQ0SQKBgQD31yNDrlWKQxt68Sm7\nejLrZTCArSxbU+kOVd+06zaldXZcepgmHdK1fFVHNwKo/kZKDdsXoXAq2+UpSl+C\nU9KHhc/gtnoFeJ94coX/aWQB5XwGCH7XDRj7oHYE44/k5gVwryy7X/SZk/fvrGTX\n4eW5kiU9N8rW0prrWVqAZCgMbwKBgQDEITdY46tCuyDWbrpPdqH25ScCw8HCyv2x\nGFp0WQcfzq8ArZon7RyvLLeAwlx+MzOfLcdxR2tLxaka4fiejYhUXbMKQpvley8C\nSIE+3HJKydAbwoKUTUIhiawp0dIVtpQ6mO8x5QrNc+UQJMgGfke/xd2jM16GPcdD\nF5SNhdF1qQKBgFcXnObNvnWFu4RqdtXQzU/3ESJGuI2nYQCOoLw848klC+DXm9vZ\nIxBvjrAl3qNwJ1cio1kcfAQzncXywrlTp2nEVhaLSTne93smE3x7lo8sC3c7SQdd\nLOhPrOlu5kPzqPm+NSPrRlMpsjjhBdbvJQEfIELw9jCjdZk6nxj7GS+1AoGBAMOo\n73I6DkxQKn5BkJRdoU6RZM2ZRN9zaosV5IdVmYndwzBGABf8sDUBwz8spuEvazxN\niz4zJZM96WnsLP7f6zVfFJITyTqyHT+F3Yo8mbiKhJZtAZ+5Q1P56EsACzmmH1Il\n59o6yQAVslrclsADksh6OJXrVU1OrE7+YzCcY02hAoGBAKs807EbkTzsVWaIBSV3\nPm8cY8+oA7WB2FosfolKruXazE8I0zv/w0nIiAuFYJmub/37fPZM4UFbbQWBuuRK\nEHqs3UrnLWQLu+Q+w1VkrM5FknB2pb0XLsS86EMPfTtcQRumeER7GFO+b+Q2XLxQ\nVYREifIn8STw4kBcnxZs7eGt\n-----END PRIVATE KEY-----\n'
    });
  });

  it('should have correct clientConfig values', () => {
    const { clientConfig } = require('../../config');

    expect(clientConfig.projectId).toBe('graphql-client-app');
    expect(clientConfig.apiKey).toBe('firebase_api_key'); // Теперь должно работать с замокированным значением
    expect(clientConfig.authDomain).toBe('graphql-client-app.firebaseapp.com');
    expect(clientConfig.databaseURL).toBe('graphql-client-app.firebaseio.com');
    expect(clientConfig.messagingSenderId).toBe('62643942006');
  });
});
