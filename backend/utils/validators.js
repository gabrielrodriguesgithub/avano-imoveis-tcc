function validateFields(requiredFields, body) {
  const missing = [];

  requiredFields.forEach((field) => {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      missing.push(field);
    }
  });

  if (missing.length) {
    return `Campos obrigatórios ausentes: ${missing.join(', ')}`;
  }

  return null;
}

function validateEmail(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(String(email).toLowerCase());
}

module.exports = {
  validateFields,
  validateEmail,
};
