// const fs = require('fs')
const dbService = require('./db.service.js')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    logIn,
    updateFriendReq,
}

async function query(filterBy = {}) {

    const criteria = {};
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt)
        criteria.userName = { $regex: regex }
    }
    // console.log('this is criteria', criteria)
    const collection = await dbService.getCollection('dog')
    try {
        const dogs = await collection.find(criteria).toArray();
        return dogs
    } catch (err) {
        console.log('ERROR: cannot find dogs')
        throw err;
    }
}

async function getById(dogId) {
    const collection = await dbService.getCollection('dog')
    try {
        const dog = await collection.findOne({ "_id": ObjectId(dogId) })
        return dog
    } catch (err) {
        console.log(`ERROR: cannot find dog ${dogId}`)
        throw err;
    }
}


async function remove(dogId) {
    const collection = await dbService.getCollection('dog')
    try {
        await collection.remove({ "_id": ObjectId(dogId) })
    } catch (err) {
        console.log(`ERROR: cannot remove dog ${dogId}`)
        throw err;
    }
}

async function update(dog) {
    const collection = await dbService.getCollection('dog')
    try {
        const strId = dog._id
        const _id = new ObjectId(strId)
        dog._id = _id
        await collection.updateOne({ _id }, { $set: dog })
        return dog
    } catch (err) {
        console.log(`ERROR: cannot update dog ${dog._id}`)
        throw err;
    }
}

async function updateFriendReq(currUser, { dogId }) {
    const collection = await dbService.getCollection('dog')
    try {
        const currUser_id = new ObjectId(currUser._id)
        console.log('jjjjjjjjjjj', currUser_id)
        await collection.updateOne({ _id: currUser_id }, { $push: { sentFriendsReq: dogId } })
        const id = new ObjectId(dogId)
        await collection.updateOne({ _id: id }, { $push: { gotFriendsReq: { userId: currUser._id, userImg: currUser.profileImg, userName: currUser.owner.fullName } } })
        return dogId
    } catch (err) {
        console.log(`ERROR: cannot update dog ${dogId}`)
        throw err;
    }
}





async function add(newUser) {
    const collection = await dbService.getCollection('dog')
    try {
        await collection.insertOne(newUser);
        return newUser;
    } catch (err) {
        console.log(`ERROR: cannot insert dog`)
        throw err;
    }
}


async function logIn(currUser) {
    const collection = await dbService.getCollection('dog')
    try {
        const user = await collection.find({ $and: [{ userName: currUser.name }, { password: currUser.pass }] }).toArray();
        // ({ userName: currUser.name }, { password: currUser.pass })
        if (user) {
            return user
        } else return Promise.reject('Cant find the user')
    } catch (err) {
        console.log(err, 'in back service')
        console.log(`ERROR: cannot login`)
        return Promise.reject('cant login')
    }
}