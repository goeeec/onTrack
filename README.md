# onTrack

A project management tool developed using MERN stack.
A project of CUNY Tech Prep.

## Installation

### Install PostgresSQL

```bash
// Installing on a Mac
brew update
brew install postgresql

// install brew services if you don’t already have it installed
brew tap homebrew/services

// start postgresql server
brew services start postgresql
```

### Config Database && User

```bash
// Inside psql
create database ontrack
create user threejs

//give password
alter user threejs with encrypted password 'admin21';
// give privileges
grant all privileges on database ontrack to threejs ;
```

## Members:

- Ching, Joey
- Kang, Jianming
- Lin, Joe

test
