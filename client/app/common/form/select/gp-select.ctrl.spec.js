import Gp-selectModule from './gp-select'
import Gp-selectController from './gp-select.ctrl';
import Gp-selectComponent from './gp-select.comp';
import Gp-selectTemplate from './gp-select.html';

describe('Gp-select', () => {
  let $rootScope, makeController;

  beforeEach(window.module(Gp-selectModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new Gp-selectController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(Gp-selectTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = Gp-selectComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(Gp-selectTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(Gp-selectController);
      });
  });
});
