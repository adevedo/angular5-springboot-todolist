package com.adevedo.todo.backend;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class TodoBackendController {

	public static final Logger logger = LoggerFactory.getLogger(TodoBackendController.class);

	@Autowired
	private TodoRepository todoRepository;

	@RequestMapping("greeting")
	public String sayHello() {
		return "This is hello world = " + todoRepository.count();
	}

	@RequestMapping(value = "/todos/", method = RequestMethod.GET)
	public ResponseEntity<List<Todo>> listAlltodos() {
		List<Todo> todos = new ArrayList<>();
		todoRepository.findAll().forEach(todos::add);
		return new ResponseEntity<List<Todo>>(todos, HttpStatus.OK);
	}

	@RequestMapping(value = "/todos/", method = RequestMethod.POST)
	public ResponseEntity<?> createNewTodo(@RequestBody Todo todo) {
		logger.info("Creating Todo : {}", todo);
		todo = todoRepository.save(todo);
		logger.info("Todo created, id = {}", todo.getId());
		return new ResponseEntity<Todo>(todo, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/todos/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getTodo(@PathVariable("id") String id) {
		logger.info("Fetching Todo with id {}", id);
		Todo todo = todoRepository.findOne(id);
		if (todo == null) {
			logger.error("Todo with id {} not found.", id);
			return new ResponseEntity<String>("Todo with id " + id + " not found", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}

	@RequestMapping(value = "/todos/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTodo(@PathVariable("id") String id, @RequestBody Todo todo) {
		logger.info("Updating Todo with id {}", id);
		todo = todoRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
}
