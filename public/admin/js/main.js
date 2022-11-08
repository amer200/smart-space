const removeParent = (t) => {
  console.log(t)
  t.parentElement.remove();
}
const addServ = () => {
  const servicesList = document.getElementById('newServs');
  const servContainer = document.createElement('div');
  servContainer.classList = 'mb-3';
  servContainer.innerHTML = '<label for="exampleInputEmail1" class="form-label">اسم الخدمة بالعربي</label > <input type="text" name="serv_title_ar" class="form-control"> <label for="exampleInputEmail1" class="form-label">وصف الخدمة بالعربي</label><textarea name="serv_txt_ar" class="form-control" cols="30"rows="5"></textarea><hr><label for="exampleInputEmail1" class="form-label">اسم الخدمةبالانجليزي</label><input type="text" name="serv_title_en" class="form-control"><label for="exampleInputEmail1" class="form-label">وصف الخدمةبالانجليزي</label><textarea name="serv_txt_en" class="form-control" cols="30"rows="5"></textarea><hr><button type="button" class="btn btn-danger"onclick="removeParent(this)">حذف</button>';
  servicesList.appendChild(servContainer);
}