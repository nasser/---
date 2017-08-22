Rainbow.extend('qlb', [
  {
    'matches': {
      1: 'special-form'
    },
    'pattern': /\((لامدا|حرفي|إفعل|حدد|عدل|إذا)/g
  },
  {
    'matches': {
      1: "function"
    },
    'pattern': /\(([ؤئـأابجدهوزحتيكلمنقشعرتطةسدفغخصذنمظىآإضث\-؟]{2,})/g
  },
  {
    'name': 'string',
    'pattern': /"[^"]+"/g
  },
  {
    'name': 'number',
    'pattern': /[١٢٣٤٥٦٧٨٩٠،]+/g
  },
  {
    'matches': {
      1: 'latin'
    },
    'pattern': /\s(\w+)/g
  }
], true);

