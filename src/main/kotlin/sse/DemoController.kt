package sse

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class DemoController() {
    @GetMapping("/health")
    fun healh() = "UP"
}