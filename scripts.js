// js

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
  
    let draggedItem = null;
  
    container.addEventListener('dragstart', function (e) {
      if (e.target.classList.contains('student')) {
        draggedItem = e.target;
        setTimeout(() => e.target.classList.add('dragging'), 0);
      }
    });
  
    container.addEventListener('dragend', function () {
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
        draggedItem = null;
      }
    });
  
    container.addEventListener('dragover', function (e) {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      if (afterElement == null) {
        container.appendChild(draggedItem);
      } else {
        container.insertBefore(draggedItem, afterElement);
      }
    });
  
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.student:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  
    // Enable drag and drop for students
    document.querySelectorAll('.student').forEach(student => {
      student.setAttribute('draggable', 'true');
    });
  
    // Smoothing effect with CSS
    const style = document.createElement('style');
    style.textContent = `
      .student.dragging {
        opacity: 0.5;
        transform: scale(1.05);
        transition: transform 0.1s ease-in-out;
      }
      .student {
        transition: transform 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  });
  