
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import parse from './getParser';

const getFormat = file => path.extname(file).replace('.', '');

const f = (file1, file2) => {
  // получим содержание файлов как текст
  // в дальнейшем можно будет вынести это в отдельный модуль,
  // чтобы алгоритм сравнения получал на вход всегда готовые объекты
  // это нужно для отработки других кейсов - например, если к сравнению придет текст, а не файлы
  const text1 = fs.readFileSync(file1, 'utf8');
  const text2 = fs.readFileSync(file2, 'utf8');

  const format1 = getFormat(file1);
  const format2 = getFormat(file2);

  const obj1 = parse(format1)(text1);
  const obj2 = parse(format2)(text2);

  console.log(obj1);

  const makeAST = (obj, arrayAST) => {
    const arrForThisParent = _.keys(obj).reduce((acc, currentKey) => {
      if (obj[currentKey] instanceof Object) {
        acc.push({ `${currentKey}`: { type: 'group', status: 'added', children: makeAST(obj[currentKey], []) } });
      } else {
        acc.push({ `${currentKey}`: { type: 'element', status: 'added' } });
      }
      return acc;
    }, []);
    return [...arrayAST, ...arrForThisParent];
  };

  const AST = makeAST(obj1, []);

  // const addDiffToAST = (AST, obj2) => {

  // обойдем Объект 2 и сравним его с AST:
  const iterObject2 = (AST, obj2) => {
    _.keys(obj2).reduce((acc, currentKey) => {
      if (obj2[currentKey] instanceof Object) {

      } else {
        const elemExist = _.keys(AST).reduce((findOut, cur) => {
          if (currentKey === cur) return true;
        }, false);
        if (elemExist) {
          console.log(`FIND EQUAL == ${AST[currentKey]}`);
          AST[currentKey].status = 'equal';
        }
      }
    }, []);
  };


//  }





  console.log(JSON.stringify(AST));



  // console.log(JSON.stringify(iterObject2(AST, obj2), null, '  '));
  // console.log(AST);

  // const iterAST = (node) => {
  //   console.log(node.type);
  //   switch (node.type) {
  //     case 'group':
  //       return `${node.status} ${node.key} ${node.children.map(iterAST).join('')}`;
  //     //  break;
  //     case 'element':
  //       return `${node.status} ${node.key}`;
  //     //  break;
  //     default:
  //   }
  // };

  // console.log(AST.map(iterAST));

  // console.log(iter(obj1, []).toString());

  //
  // const reduceTree = (f, tree, acc) => {
  //   const [, children] = tree;
  //   const newAcc = f(acc, tree);
  //
  //   if (!children) {
  //     return newAcc;
  //   }
  //   return children.reduce((iAcc, n) => reduceTree(f, n, iAcc), newAcc);
  // };


  const key12 = _.union(_.keys(obj1), _.keys(obj2));

  return key12.reduce((acc, currentValue) => {
    if ((obj1[currentValue] !== undefined)
      && (obj2[currentValue] !== undefined)
      && (obj1[currentValue] === obj2[currentValue])) {
      return { ...acc, [`  ${currentValue}`]: obj1[currentValue] };
    }

    if ((obj1[currentValue] !== undefined)
      && (obj2[currentValue] !== undefined)
      && (obj1[currentValue] !== obj2[currentValue])) {
      return { ...acc, [`+ ${currentValue}`]: obj2[currentValue], [`- ${currentValue}`]: obj1[currentValue] };
    }

    if ((obj1[currentValue] !== undefined)
      && (obj2[currentValue] === undefined)) {
      return { ...acc, [`- ${currentValue}`]: obj1[currentValue] };
    }

    if ((obj2[currentValue] !== undefined)
      && (obj1[currentValue] === undefined)) {
      return { ...acc, [`+ ${currentValue}`]: obj2[currentValue] };
    }

    return acc;
  }, {});
};

export default f;
