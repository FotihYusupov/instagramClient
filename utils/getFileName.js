function getFileExtension(fileName) {
  const parts = fileName.split('.');  
  const extension = parts[parts.length - 1];  
  return extension.toLowerCase();
}

export default getFileExtension