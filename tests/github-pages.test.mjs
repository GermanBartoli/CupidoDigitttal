import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../_worker.js';

test('GitHub Pages puede leer la validación del formulario sin enviar correos', async () => {
  for (const origin of ['https://germanbartoli.github.io', 'https://otro.example']) {
    const response = await worker.fetch(new Request('https://cupido.example/api/contact', { method: 'POST', headers: { Origin: origin }, body: new FormData() }), {});
    assert.ok(response.status >= 400);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin === 'https://germanbartoli.github.io' ? origin : null);
    assert.equal((await response.json()).ok, false);
  }
});
