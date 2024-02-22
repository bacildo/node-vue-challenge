
const mount = require('@vue/test-utils');
const StudentsList = require( '../../src/components/StudentsList.vue');

describe('StudentsList.vue', () => {
  it('renders a list of students', () => {
    const students = [
      { id_student: 1, name: 'Darth Vader', register: '12345', cpf: '12345678900', email: 'darth.doe@example.com' },
      { id_student: 2, name: 'Han Solo', register: '54321', cpf: '98765432100', email: 'han.smith@example.com' }
    ];
    const wrapper = mount(StudentsList, {
      props: { students }
    });

    const studentItems = wrapper.findAll('.student-card');
    expect(studentItems).toHaveLength(2);

    const firstStudent = studentItems.at(0);
    expect(firstStudent.text()).toContain('Darth Vader');
    expect(firstStudent.text()).toContain('Matrícula: 12345');
    expect(firstStudent.text()).toContain('CPF: 12345678900');
    expect(firstStudent.text()).toContain('E-mail: darth.doe@example.com');

    const secondStudent = studentItems.at(1);
    expect(secondStudent.text()).toContain('Han Solo');
    expect(secondStudent.text()).toContain('Matrícula: 54321');
    expect(secondStudent.text()).toContain('CPF: 98765432100');
    expect(secondStudent.text()).toContain('E-mail: han.smith@example.com');
  });

  it('emits an event when edit button is clicked', async () => {
    const students = [
      { id_student: 1, name: 'Darth Vader', register: '12345', cpf: '12345678900', email: 'darth.doe@example.com' }
    ];
    const wrapper = mount(StudentsList, {
      props: { students }
    });

    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    expect(wrapper.emitted('edit-student')).toBeTruthy();
    expect(wrapper.emitted('edit-student')[0]).toEqual([{ id_student: 1, name: 'Darth Vader', register: '12345', cpf: '12345678900', email: 'darth.doe@example.com' }]);
  });

  it('emits an event when delete button is clicked', async () => {
    const students = [
      { id_student: 1, name: 'Darth Vader', register: '12345', cpf: '12345678900', email: 'darth.doe@example.com' }
    ];
    const wrapper = mount(StudentsList, {
      props: { students }
    });

    const deleteButton = wrapper.find('.delete-button');
    await deleteButton.trigger('click');

    expect(wrapper.emitted('delete-student')).toBeTruthy();
    expect(wrapper.emitted('delete-student')[0]).toEqual([1]);
  });
});
