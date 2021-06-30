import React, { useCallback, useEffect, useState } from 'react';
import { getAllUsers, approveUsers } from '../../../../services/supplier.service';
import moment from 'moment';
import 'moment/locale/pt-br.js';

const SupplierList = () => {
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const res = await getAllUsers();
      setUserList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [getUser, loading]);

  const editUser = (id, status) => {
    const data = {
      status
    }
    approveUsers(id, data);
    setLoading(true);
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Localidade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Criação
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {userList && userList.length ? (
                userList && userList.map((person) => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.nome}</div>
                          <div className="text-sm text-gray-500">{person.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.cidade}</div>
                      <div className="text-sm text-gray-500">{person.estado}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {moment(person.dt_criacao).startOf('hour').fromNow()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(person.visivel === true) ? (
                        <span onClick={() => editUser(person.id, !person.visivel)} className="cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      ) : (
                        <span onClick={() => editUser(person.id, !person.visivel)} className="cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inativo
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Loading...</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierList;