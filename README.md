# TalentLMS API Wrapper

A TypeScript/JavaScript wrapper for the TalentLMS API, making it easy to interact with TalentLMS from your Node.js applications.

[![npm version](https://badge.fury.io/js/talentlms-js.svg)](https://badge.fury.io/js/talentlms-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install talentlms-js
```

## Usage

Configure the TalentLms API wrapper with your API key and domain:

```typescript
import TalentLms from 'talentlms-js';

const talentlms = new TalentLms({
  apiKey: 'your_api_key', // as a base64 encoded string
  subdomain: 'your_subdomain', // the subdomain part of your TalentLMS instance e.g. if your instance is at https://company.talentlms.com, then your subdomain is "company"
  // alternatively you can pass in the entire domain as a string e.g. "https://company.talentlms.com"
  domain: 'company.talentlms.com'
});
```

```typescript
async function example() {
  const users = await api.getAllUsers();
  console.log(users);

  const course = await api.getCourseByCode('COURSE001');
  console.log(course);

  const usersByPhone = await api.getUserByPhone('1234567890');
  console.log(usersByPhone);
}
example().catch(console.error);
```