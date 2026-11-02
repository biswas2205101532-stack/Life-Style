import {uid} from '../utils/calc'
const B='https://www.w3schools.com/c/'
const W=[['Week 1 — Fundamentals',[['Introduction to C','c_intro.php'],['Installing a C Compiler','c_getstarted.php'],['Structure of a C Program','c_syntax.php'],['Variables','c_variables.php'],['Data Types','c_data_types.php'],['Constants','c_constants.php'],['Input and Output','c_user_input.php'],['Operators','c_operators.php'],['Comments','c_comments.php'],['Basic C Programs','']]],
['Week 2 — Conditions and Loops',[['If Statement','c_conditions.php'],['If-Else Statement','c_conditions.php'],['Nested If','c_conditions.php'],['Switch Statement','c_switch.php'],['For Loop','c_for_loop.php'],['While Loop','c_while_loop.php'],['Do-While Loop','c_do_while_loop.php'],['Break Statement','c_break_continue.php'],['Continue Statement','c_break_continue.php'],['Nested Loops','c_for_loop.php']]],
['Week 3 — Arrays, Strings and Functions',[['Introduction to Arrays','c_arrays.php'],['One-Dimensional Array','c_arrays.php'],['Two-Dimensional Array','c_arrays_multi.php'],['String Introduction','c_strings.php'],['String Functions',''],['User-Defined Functions','c_functions.php'],['Function Parameters','c_functions_parameters.php'],['Return Values','c_functions.php'],['Recursion','c_functions_recursion.php'],['Scope of Variables','']]],
['Week 4 — Advanced C Programming',[['Pointers','c_pointers.php'],['Pointer Arithmetic',''],['Call by Value and Address',''],['Structures','c_structs.php'],['Union',''],['Enumerations','c_enums.php'],['File Handling','c_files.php'],['Dynamic Memory Allocation',''],['Preprocessor Directives',''],['Mini Project','']]]]
export const cRoadmap=()=>({id:'c',title:'C Programming',cat:'Programming Languages',desc:'A 4-week journey from first program to pointers, structures and files.',
weeks:W.map(([name,t])=>({id:uid(),name,topics:t.map(([title,u])=>({id:uid(),title,url:B+u,done:false}))}))})
export const emptyRoadmap=(title,cat)=>({id:uid(),title,cat,desc:`My ${title} roadmap.`,
weeks:[1,2,3,4].map(i=>({id:uid(),name:`Week ${i}`,topics:[]}))})
export const seed=()=>({name:'Learner',theme:'dark',active:'c',roadmaps:[cRoadmap()],goals:[]})
