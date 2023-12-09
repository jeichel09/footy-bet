const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
    const month = date.toLocaleDateString('en-GB', { month: '2-digit' });
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  
    return `${day}/${month} ${time}`;
  };

  export default formatDate;