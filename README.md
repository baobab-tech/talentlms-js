# TalentLMS API Wrapper

A TypeScript/JavaScript wrapper for the TalentLMS API, making it easy to interact with TalentLMS from your Node.js applications.

**Important Note:**
This wrapper is for https://www.talentlms.com/
We have no affiliation with TalentLMS; we built this TypeScript version to help us support our clients.
For any questions about the TalentLMS API, please check their support resources.

[![npm version](https://badge.fury.io/js/@baobabtech%2Ftalentlms-js.svg)](https://badge.fury.io/js/@baobabtech%2Ftalentlms-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
<!-- ![NPM Downloads](https://img.shields.io/npm/dm/@baobabtech/talentlms-js) -->

## Installation

```bash
npm install talentlms-js
```

## Usage

Configure the TalentLms API wrapper with your API key and domain:

```typescript
import TalentLms from 'talentlms-js';

const talentlms = new TalentLms({
  apiKey: 'your_api_key', // as provided by TalentLMS
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
