module.exports = async function createTestData(models) {
  const user1 = new models.User({
    username: 'awesomeuser',
    createdAt: Date.now(),
    email: 'rwi@awesomeuser.com',
    password: 'password123',
    _id: '5e4e555cbf31ef2588e22124',
    role: 'USER'
  });
  const user2 = new models.User({
    username: 'awesomeadmin',
    createdAt: Date.now(),
    email: 'ar@awesomeuser.com',
    password: 'password123',
    _id: '5e4e555cbf31ef2588e22125',
    role: 'ADMIN'
  });
  const bookmark1 = new models.Bookmark({
    bookmarkTitle: 'What a beuty test',
    bookmarkSlug: 'What-a-beuty-test',
    createdBy: user1.id,
    createdAt: Date.now(),
    _id: '5e4e555cbf31ef2588e22126'
  });
  const bookmark2 = new models.Bookmark({
    bookmarkTitle: 'Ready for production',
    bookmarkSlug: 'Ready-for-production',
    createdBy: user2.id,
    createdAt: Date.now(),
    _id: '5e4e555cbf31ef2588e22127'
  });
  const bookmark3 = new models.Bookmark({
    bookmarkTitle: 'Good Jobs',
    bookmarkSlug: 'Good-Jobs',
    createdBy: user2.id,
    createdAt: Date.now(),
    _id: '5e4e555cbf31ef2588e22128'
  });
  await bookmark1.save();
  await bookmark2.save();
  await bookmark3.save();
  await user1.save();
  await user2.save();
  console.log('DATA SEEDED');
};
